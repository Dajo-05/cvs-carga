# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

Aquí tienes las instrucciones en español para descargar el proyecto de GitHub y los comandos necesarios para ejecutarlo:

# React + TypeScript + Vite

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) usa [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) usa [SWC](https://swc.rs/) para Fast Refresh

## Expandiendo la configuración de ESLint

Si estás desarrollando una aplicación de producción, te recomendamos actualizar la configuración para habilitar reglas de lint con conocimiento de tipos:

- Configura la propiedad `parserOptions` de nivel superior de esta manera:

```js
export default tseslint.config({
  languageOptions: {
    // otras opciones...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Reemplaza `tseslint.configs.recommended` por `tseslint.configs.recommendedTypeChecked` o `tseslint.configs.strictTypeChecked`
- Opcionalmente añade `...tseslint.configs.stylisticTypeChecked`
- Instala [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) y actualiza la configuración:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Establece la versión de react
  settings: { react: { version: '18.3' } },
  plugins: {
    // Añade el plugin de react
    react,
  },
  rules: {
    // otras reglas...
    // Habilita sus reglas recomendadas
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Descargar y ejecutar el proyecto

Para descargar el proyecto desde GitHub y ejecutarlo, sigue estos pasos:

1. Clona el repositorio desde GitHub:

```bash
git clone https://github.com/Dajo-05/cvs-carga.git
```

2. Navega al directorio del proyecto:

```bash
cd cvs-carga
```
3. Confirmar la URL del backend:
buscar el archivo llamado clienteService y validar que la url  configurada en la constante API_URL sea la misma que genera el backen, en caso de no ser la misma solo cambiar al valor de localhost. para verificar la url en backend se debe abrir el archivo launchSettings.json que esta en carpeta properties de proyecto ApiCargar_CVS y buscar lo siguiente ahi encontrara las URL:

```
"https": {
  "commandName": "Project",
  "dotnetRunMessages": true,
  "launchBrowser": true,
  "launchUrl": "swagger",
  "applicationUrl": "https://localhost:7091;http://localhost:5272",
  "environmentVariables": {
    "ASPNETCORE_ENVIRONMENT": "Development"
  }

```

4. Instala las dependencias necesarias:

```bash
npm install
```

5. Ejecuta el proyecto:

```bash
npm run dev
```
