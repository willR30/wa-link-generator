# WhatsApp Link Generator / Generador de enlaces de WhatsApp



### 🚀 Try it out / Pruébalo ahora

[![English](https://img.shields.io/badge/Try_it_here-English-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://williberto.site/wa-link-generator/)
[![Español](https://img.shields.io/badge/Pruébalo_aquí-Español-128C7E?style=for-the-badge&logo=whatsapp&logoColor=white)](https://williberto.site/wa-link-generator/)

<img width="763" height="620" alt="image" src="https://github.com/user-attachments/assets/33484495-e474-477a-881e-136f25e4893f" />


## English

- **Description:** A small web app that creates direct WhatsApp chat links (wa.me) from a country code, phone number and optional message.
- **Live files:** [index.html](index.html), [main.js](main.js), [style.css](style.css), [assets/country_codes.json](assets/country_codes.json)

### Features

- Select a country dialing code from a searchable dropdown.
- Enter a phone number (non-digit characters are stripped).
- Add an optional message (properly URL-encoded).
- Copy the generated WhatsApp link to the clipboard.

### Usage

1. Serve the project files over HTTP (recommended) or open `index.html` in a browser.

If you prefer a lightweight local server, you can use `npx http-server` (Node.js required):

```
npx http-server . -p 8000

# then open http://localhost:8000 in your browser
```

2. Pick a country code, enter the phone number (without the country code), type an optional message, and click "Generate link".

Note: The app fetches `assets/country_codes.json` via `fetch()`, so serving over HTTP avoids local file restrictions in some browsers.

### Development

- No build step required. Edit files directly and reload the browser.
- Main logic is in [main.js](main.js). Country list is in [assets/country_codes.json](assets/country_codes.json).

---

## Español

- **Descripción:** Pequeña aplicación web que crea enlaces directos de chat de WhatsApp (wa.me) a partir de un código de país, número de teléfono y mensaje opcional.
- **Archivos principales:** [index.html](index.html), [main.js](main.js), [style.css](style.css), [assets/country_codes.json](assets/country_codes.json)

### Funcionalidades

- Seleccionar el código de marcación de un país desde un menú desplegable con búsqueda.
- Ingresar el número de teléfono (se eliminan caracteres no numéricos).
- Añadir un mensaje opcional (se codifica correctamente en la URL).
- Copiar el enlace generado al portapapeles.

### Uso

1. Servir los archivos por HTTP (recomendado) o abrir `index.html` en el navegador.

Si prefieres un servidor local ligero, puedes usar `npx http-server` (requiere Node.js):

```
npx http-server . -p 8000

# luego abrir http://localhost:8000 en el navegador
```

2. Selecciona un código de país, introduce el número (sin el código), escribe un mensaje opcional y pulsa "Generate link".

Nota: La app carga `assets/country_codes.json` con `fetch()`, por lo que servirla por HTTP evita restricciones de archivos locales en algunos navegadores.

### Desarrollo

- No requiere compilación. Edita los archivos y recarga el navegador.
- La lógica principal está en [main.js](main.js). La lista de países está en [assets/country_codes.json](assets/country_codes.json).


