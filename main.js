// @ts-check
document.addEventListener('DOMContentLoaded', main);
const $ = id => document.querySelector(id);

const DEFAULT_COUNTRY_CODE = '505';

function main() {
    // Bug fix: the button shows "+505" by default, but nothing ever set
    // its `.value`, so submitting without opening the dropdown failed
    // with "You must select a country code". This keeps them in sync.
    $('#dropdown-country-code').value = DEFAULT_COUNTRY_CODE;

    getCountryCodes().then(countryCodes => {
        for (let code of countryCodes) {
            let container = document.createElement('div');
            container.classList.add('row', 'dropdown-item');
            container.dataset.country = code.country;
            container.tabIndex = 0; // keyboard-focusable

            let codeContainer = document.createElement('div');
            codeContainer.classList.add('col-3');
            codeContainer.innerText = code.phoneExt;
            container.appendChild(codeContainer);

            let nameContainer = document.createElement('div');
            nameContainer.classList.add('col');
            nameContainer.innerText = code.country;
            container.appendChild(nameContainer);

            const selectCountry = () => {
                $('#dropdown-country-code').value = code.phoneExt;

                // Bug fix: this used to overwrite the whole button's
                // innerText (wiping out the flag icon after the first
                // pick). Now it only updates the code label if present,
                // and falls back safely on older markup.
                let codeLabel = $('#dropdown-country-code .wa-code');
                if (codeLabel) {
                    codeLabel.innerText = `+${code.phoneExt}`;
                } else {
                    $('#dropdown-country-code').innerText = `+${code.phoneExt}`;
                }
            };

            container.onclick = selectCountry;
            container.onkeydown = (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectCountry();
                }
            };

            $('#list-country-codes').appendChild(container);
        }
        // TODO: Add scroll to specific country in dropdown
    });

    $('#form-generate-url').onsubmit = (event) => {
        event.preventDefault();
        let countryCode = $('#dropdown-country-code').value?.trim();
        if (countryCode == null || countryCode.length == 0) {
            showError('You must select a country code');
            return;
        }
        let phone = $('#input-phone-number').value?.trim();
        if (phone == null || phone.length == 0) {
            showError('You must enter a phone number');
            return;
        }
        // Bug fix: only spaces were stripped before. Dashes, dots and
        // parentheses (e.g. "8123-4567") used to survive into the URL
        // and produce a broken wa.me link.
        phone = phone.replace(/\D/g, '');
        if (phone.length === 0) {
            showError('Phone number must contain digits only');
            return;
        }
        let message = $('#input-message').value?.trim();
        let generatedUrl = generateUrl(countryCode, phone, message);
        if (generatedUrl == null) {
            showError('An error occurred while generating the URL');
            return;
        }
        $('#generated-url').href =
            $('#generated-url').innerText = generatedUrl;
        $('#result-url').style.display = 'block';
        $('#error-message').style.display = 'none';
    }

    $('#btn-copy-url').onclick = () => {
        let url = $('#generated-url').innerText;
        navigator.clipboard.writeText(url).then(() => {
            let prevContent = $('#btn-copy-url').innerHTML;
            $('#btn-copy-url').innerText = 'Copied!';
            setTimeout(() => {
                $('#btn-copy-url').innerHTML = prevContent;
            }, 2000);
        });
    }
}

function showError(errorMsg) {
    $('#error-message-text').innerText = errorMsg;
    $('#error-message').style.display = 'block';
    $('#result-url').style.display = 'none';
}

function generateUrl(countryCode, phone, message) {
    phone = phone.replace(/\D/g, '');
    let url = `https://wa.me/${countryCode}${phone}/`;
    if (message != null && message.length != 0) {
        // Bug fix: wrapping the whole URL in encodeURI() afterward left
        // "&", "=", "+" and "#" untouched inside the message, which could
        // break or truncate the link. encodeURIComponent on just the
        // message is the correct fix, and the rest of the URL is plain
        // ASCII already, so no further encoding is needed.
        url += `?text=${encodeURIComponent(message)}`;
    }
    return url;
}

async function getCountryCodes() {
    try {
        const response = await fetch('./assets/country_codes.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error('Failed to load country codes:', err);
        showError('Could not load the country list. Please reload the page.');
        return [];
    }
}
