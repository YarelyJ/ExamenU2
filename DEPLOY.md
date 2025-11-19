# Guía de Despliegue - Sistema Distribuido

Este proyecto tiene una arquitectura distribuida con **Frontend (React/Next.js)** y **Backend (Django)** separados.

---

## 📦 Estructura del Proyecto

\`\`\`
proyecto/
├── frontend/          # Aplicación Next.js (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.js
├── backend/           # API Django REST
│   ├── api/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
└── DEPLOY.md         # Esta guía
\`\`\`

---

## 🚀 DESPLIEGUE EN VERCEL (Frontend)

### Opción 1: Desde v0.app (Recomendado)
1. Haz clic en el botón **"Publish"** en la esquina superior derecha
2. v0 desplegará automáticamente tu frontend en Vercel
3. Obtendrás una URL como: `https://tu-proyecto.vercel.app`

### Opción 2: Manual desde Vercel Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New Project"**
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (raíz del proyecto)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Variables de Entorno** (importante):
   \`\`\`
   NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
   \`\`\`

6. Haz clic en **"Deploy"**

### ⚙️ Configuración Post-Despliegue
- Una vez desplegado, copia tu URL de Vercel
- Actualiza el backend para permitir CORS desde esta URL

---

## 🐍 DESPLIEGUE EN RENDER (Backend Django)

### Paso 1: Preparar Repositorio
1. Sube tu código a GitHub
2. Asegúrate de que `backend/` contenga:
   - `requirements.txt`
   - `render.yaml` (archivo de configuración)

### Paso 2: Crear Servicio en Render
1. Ve a [render.com](https://render.com)
2. Crea una cuenta o inicia sesión
3. Haz clic en **"New +"** → **"Web Service"**

### Paso 3: Conectar Repositorio
1. Conecta tu repositorio de GitHub
2. Configura:
   - **Name**: `data-science-api` (o el que prefieras)
   - **Region**: Elige la más cercana
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: 
     \`\`\`bash
     pip install -r requirements.txt && python manage.py migrate
     \`\`\`
   - **Start Command**: 
     \`\`\`bash
     gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
     \`\`\`

### Paso 4: Variables de Entorno
Agrega estas variables en la sección **Environment**:

\`\`\`
DJANGO_SECRET_KEY=tu-clave-secreta-aqui-generala
DJANGO_DEBUG=False
ALLOWED_HOSTS=.onrender.com
CORS_ALLOWED_ORIGINS=https://tu-proyecto.vercel.app
DATABASE_URL=tu-base-de-datos (opcional)
\`\`\`

**Generar SECRET_KEY segura:**
\`\`\`python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
\`\`\`

### Paso 5: Deploy
1. Haz clic en **"Create Web Service"**
2. Render construirá y desplegará tu backend
3. Obtendrás una URL como: `https://data-science-api.onrender.com`

---

## 🔗 CONECTAR FRONTEND Y BACKEND

### 1. Actualiza el Frontend
En tu proyecto de Vercel, agrega la variable de entorno:
\`\`\`
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
\`\`\`

### 2. Actualiza el Backend
En las variables de entorno de Render, actualiza:
\`\`\`
CORS_ALLOWED_ORIGINS=https://tu-proyecto.vercel.app,https://tu-dominio-personalizado.com
\`\`\`

### 3. Reinicia Ambos Servicios
- En Vercel: Haz un redeploy
- En Render: El servicio se reiniciará automáticamente

---

## ✅ VERIFICACIÓN

### Verificar Backend
\`\`\`bash
curl https://tu-backend.onrender.com/api/modules/
\`\`\`
Deberías recibir un JSON con los módulos.

### Verificar Frontend
1. Visita `https://tu-proyecto.vercel.app`
2. Abre DevTools (F12) → Console
3. Verifica que no haya errores de CORS

---

## 🔧 SOLUCIÓN DE PROBLEMAS

### Error de CORS
**Síntoma**: `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solución**:
1. Verifica `CORS_ALLOWED_ORIGINS` en backend incluya tu URL de Vercel
2. Reinicia el servicio en Render

### Backend no responde
**Síntoma**: `Failed to fetch` o timeout

**Solución**:
1. Verifica logs en Render Dashboard
2. Confirma que el servicio esté "Running"
3. Prueba el endpoint directamente: `https://tu-backend.onrender.com/api/modules/`

### Frontend no muestra datos
**Síntoma**: Página carga pero sin contenido

**Solución**:
1. Verifica `NEXT_PUBLIC_API_URL` en Vercel
2. Abre DevTools → Network → Busca la petición API
3. Verifica la respuesta

---

## 📝 COMANDOS ÚTILES

### Desarrollo Local

**Frontend:**
\`\`\`bash
cd frontend
npm install
npm run dev
# Abre http://localhost:3000
\`\`\`

**Backend:**
\`\`\`bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Abre http://localhost:8000
\`\`\`

### Ver Logs

**Vercel:**
\`\`\`bash
vercel logs
\`\`\`

**Render:**
- Ve al Dashboard → Tu servicio → Logs

---

## 🌐 URLs Finales

Después del despliegue, tendrás:

- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend API**: `https://data-science-api.onrender.com`
- **Documentación API**: `https://data-science-api.onrender.com/api/`

---

## 📧 Soporte

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **Django**: [docs.djangoproject.com](https://docs.djangoproject.com)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
