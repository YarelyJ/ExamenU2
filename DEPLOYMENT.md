# Guía de Despliegue - DataDocs

Esta guía detalla cómo desplegar la aplicación DataDocs en producción.

## Arquitectura

DataDocs está construido como una aplicación **Next.js autosuficiente**:
- Frontend: Next.js 16 con React 19
- API: Next.js API Routes (`/api/docs`)
- Base de datos: **No requiere** (datos en memoria)

**Opcional:** Backend Django separado (no necesario para funcionalidad básica)

---

## Opción 1: Despliegue en Vercel (Recomendado)

### Requisitos
- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub/GitLab/Bitbucket

### Pasos

#### 1. Desde la Interfaz Web de Vercel

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en "Add New Project"
3. Importa tu repositorio de Git
4. Vercel detectará automáticamente Next.js
5. Configuración:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `.next` (automático)
   - **Install Command:** `npm install` (automático)
6. Click en "Deploy"

#### 2. Desde la CLI de Vercel

\`\`\`bash
# Instalar Vercel CLI
npm install -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
\`\`\`

### Variables de Entorno (Vercel)

No se requieren variables de entorno para la versión básica.

---

## Opción 2: Despliegue en Netlify

### Desde la Interfaz Web

1. Ve a [netlify.com](https://netlify.com)
2. Click en "Add new site" → "Import an existing project"
3. Conecta tu repositorio
4. Configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Base directory:** (dejar vacío)
5. Click en "Deploy site"

### Desde la CLI de Netlify

\`\`\`bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar sesión
netlify login

# Inicializar proyecto
netlify init

# Desplegar
netlify deploy --prod
\`\`\`

---

## Opción 3: Servidor Node.js Tradicional

### Requisitos
- Servidor con Node.js 18+ instalado
- PM2 o similar para gestión de procesos

### Pasos

\`\`\`bash
# 1. Clonar repositorio
git clone <tu-repo>
cd <tu-proyecto>

# 2. Instalar dependencias
npm install

# 3. Build de producción
npm run build

# 4. Instalar PM2 (gestor de procesos)
npm install -g pm2

# 5. Iniciar aplicación
pm2 start npm --name "datadocs" -- start

# 6. Configurar PM2 para auto-inicio
pm2 startup
pm2 save
\`\`\`

### Nginx como Reverse Proxy

\`\`\`nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

---

## Backend Django (Opcional)

Si decides usar el backend Django separado:

### Despliegue en Render

1. Ve a [render.com](https://render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio
4. Configuración:
   - **Name:** datadocs-api
   - **Root Directory:** `backend`
   - **Environment:** Python 3
   - **Build Command:** 
     \`\`\`bash
     pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
     \`\`\`
   - **Start Command:** 
     \`\`\`bash
     gunicorn config.wsgi:application
     \`\`\`

5. Variables de entorno:
   \`\`\`
   SECRET_KEY=<generar-clave-secreta-segura>
   DEBUG=False
   ALLOWED_HOSTS=tu-app.onrender.com
   CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
   PYTHON_VERSION=3.11.6
   \`\`\`

6. Click en "Create Web Service"

### Conectar Frontend con Backend Django

Si usas el backend Django, agrega esta variable de entorno en Vercel:

\`\`\`
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com/api
\`\`\`

Y modifica `app/page.tsx`:

\`\`\`typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/docs';
const response = await fetch(apiUrl);
\`\`\`

---

## Verificación Post-Despliegue

### Checklist

- [ ] La página principal carga correctamente
- [ ] Los 3 módulos se despliegan al hacer click
- [ ] Los gráficos se visualizan correctamente
- [ ] El código de ejemplo se muestra en cada tema
- [ ] El sitio es responsive en móvil
- [ ] No hay errores en la consola del navegador

### Testing

\`\`\`bash
# Verificar API endpoint
curl https://tu-dominio.com/api/docs

# Verificar que retorna JSON con módulos
\`\`\`

---

## Optimización para Producción

### 1. Habilitar Compresión

Next.js ya incluye compresión, pero puedes optimizar más:

\`\`\`javascript
// next.config.mjs
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};
\`\`\`

### 2. Caché de CDN

Vercel y Netlify automáticamente configuran CDN. Para servidores propios:

\`\`\`nginx
# Cache de archivos estáticos
location /_next/static/ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
\`\`\`

### 3. Monitoreo

- Vercel Analytics (incluido gratis)
- Google Analytics
- Sentry para error tracking

---

## Rollback en Caso de Problemas

### En Vercel
1. Ve a tu proyecto → "Deployments"
2. Click en el deployment anterior que funcionaba
3. Click en "..." → "Promote to Production"

### En Render
1. Ve a tu servicio → "Deploys"
2. Click en el deploy anterior
3. Click en "Redeploy"

---

## Soporte

Si encuentras problemas:
1. Verifica logs en tu plataforma de deployment
2. Revisa la consola del navegador
3. Verifica que todas las dependencias estén instaladas
4. Asegúrate de usar Node.js 18 o superior

---

## Actualizaciones Futuras

Para actualizar la aplicación:

\`\`\`bash
# Hacer cambios en código
git add .
git commit -m "Descripción de cambios"
git push origin main

# Vercel/Netlify desplegarán automáticamente
# Render puede requerir trigger manual o configurar auto-deploy
