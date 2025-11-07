# Guía de Deploy

## Pasos para desplegar en Ferozo

### 1. Ejecutar el script de deploy

```bash
npm run deploy
```

### 2. Limpiar directorio en Ferozo

Desde el administrador de archivos de Ferozo, eliminar la carpeta `site` ubicada en:
```
PUBLIC_HTML/site
```

### 3. Remover conexión Git existente

En el panel de control de Ferozo GIT, eliminar la conexión actual.

### 4. Configurar nueva conexión Git

Hacer clic en "Agregar nuevo" y configurar con los siguientes valores:

- **Repositorio:** `https://github.com/nico-vt/pro-am`
- **Rama:** `deploy`
- **Directorio:** `public_html/site`

Hacer clic en "Crear ahora".

### 5. Configurar .htaccess

Una vez finalizada la sincronización, agregar el archivo `.htaccess` dentro de la carpeta `site` con el siguiente contenido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /site/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . index.html [L]
</IfModule>
```

Este archivo es necesario para que las rutas de React Router funcionen correctamente en el servidor.
