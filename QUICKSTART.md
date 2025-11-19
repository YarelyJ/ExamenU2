# Inicio Rápido - 5 minutos

## Desarrollo Local

### Terminal 1 - Backend
\`\`\`bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
\`\`\`

✅ Backend corriendo en http://localhost:8000

### Terminal 2 - Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

✅ Frontend corriendo en http://localhost:3000

## Despliegue Rápido

### 1. Frontend en Vercel (2 minutos)
- Opción A: Haz clic en "Publish" en v0.app
- Opción B: Conecta tu repo en vercel.com

Agrega variable de entorno:
\`\`\`
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
\`\`\`

### 2. Backend en Render (3 minutos)
1. Ve a render.com
2. New Web Service → Conecta tu repo
3. Configuración:
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt && python manage.py migrate`
   - Start: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`

4. Variables de entorno:
\`\`\`
SECRET_KEY=<generar-nueva-clave>
DEBUG=False
ALLOWED_HOSTS=.onrender.com
CORS_ALLOWED_ORIGINS=https://tu-app.vercel.app
\`\`\`

Para generar SECRET_KEY:
\`\`\`bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
\`\`\`

### 3. Conectar Frontend y Backend
Actualiza la variable en Vercel con la URL de Render:
\`\`\`
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
\`\`\`

¡Listo! Tu app distribuida está en producción.

Para más detalles, consulta [DEPLOY.md](./DEPLOY.md)
\`\`\`
