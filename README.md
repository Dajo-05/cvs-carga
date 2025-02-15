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
