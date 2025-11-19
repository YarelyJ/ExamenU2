# DataDocs - Documentación de Data Science

![DataDocs Banner](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-cyan)

Plataforma de documentación interactiva para módulos de Data Science con visualizaciones dinámicas, ejemplos de código y diseño moderno.

## 📚 Contenido

Tres módulos completos de Data Science:

### 1️⃣ División de Datasets
- Train-Test Split
- K-Fold Cross-Validation
- Stratified K-Fold
- Time Series Split

### 2️⃣ Preparación de Datos
- Normalización (Min-Max)
- Estandarización (Z-score)
- Encoding Categórico
- Imputación de Valores

### 3️⃣ Transformadores y Pipelines
- Custom Transformers
- Pipeline Básico
- ColumnTransformer
- GridSearchCV en Pipeline

## 🚀 Tecnologías

**Frontend:**
- **Next.js 16** - Framework React con App Router
- **React 19.2** - Librería UI con nuevas características
- **TypeScript 5** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **shadcn/ui** - Componentes accesibles y customizables
- **Recharts** - Gráficos interactivos
- **Lucide React** - Iconos modernos

**Backend (Opcional):**
- **Django 4.2.7** - Framework web Python
- **Django REST Framework** - API REST
- **Gunicorn** - Servidor WSGI para producción
- **WhiteNoise** - Servir archivos estáticos

## 📁 Estructura del Proyecto

\`\`\`
datadocs/
├── app/
│   ├── api/
│   │   └── docs/
│   │       └── route.ts          # API endpoint con documentación
│   ├── page.tsx                  # Página principal
│   ├── layout.tsx                # Layout con metadata
│   └── globals.css               # Estilos globales
│
├── components/
│   ├── ui/                       # Componentes shadcn/ui
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── theme-provider.tsx
│
├── backend/ (opcional)
│   ├── api/                      # Django app
│   ├── config/                   # Configuración Django
│   ├── requirements.txt          # Dependencias Python
│   ├── runtime.txt               # Versión de Python
│   ├── Procfile                  # Comando de inicio (Heroku/Render)
│   ├── render.yaml               # Config para Render.com
│   └── manage.py
│
├── hooks/                        # Custom React hooks
├── lib/                          # Utilidades
├── public/                       # Archivos estáticos
├── .env.example                  # Variables de entorno ejemplo
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs
├── vercel.json                   # Config para Vercel
├── README.md
└── DEPLOYMENT.md                 # Guía de despliegue detallada
\`\`\`

## 🛠️ Instalación

### Opción 1: Solo Next.js (Recomendado para empezar)

\`\`\`bash
# Clonar repositorio
git clone <tu-repo-url>
cd datadocs

# Instalar dependencias
npm install
# o
pnpm install
# o
yarn install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
# http://localhost:3000
\`\`\`

### Opción 2: Con Backend Django

#### Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`

#### Backend
\`\`\`bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
\`\`\`

El backend estará en `http://localhost:8000`

## 🌐 Despliegue

### Deploy en Vercel (Frontend) - 1 Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

O manualmente:

\`\`\`bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
\`\`\`

### Deploy en Render (Backend Django)

1. Crear cuenta en [Render.com](https://render.com)
2. Conectar repositorio
3. Crear "Web Service"
4. Root Directory: `backend`
5. Build Command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
6. Start Command: `gunicorn config.wsgi:application`

**Variables de entorno requeridas:**
- `SECRET_KEY` - Clave secreta Django
- `DEBUG` - `False`
- `ALLOWED_HOSTS` - Tu dominio de Render
- `CORS_ALLOWED_ORIGINS` - URL de tu frontend

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para guía completa.

## 📄 API Endpoints

### GET `/api/docs`
Retorna toda la documentación de módulos en JSON.

**Respuesta:**
\`\`\`json
{
  "modules": [
    {
      "id": 1,
      "title": "División de Datasets",
      "docNumber": "07_Division_DataSet",
      "description": "Técnicas esenciales para dividir datos correctamente",
      "topics": [
        {
          "name": "Train-Test Split",
          "description": "...",
          "code": "...",
          "fullDescription": "..."
        }
      ],
      "chartData": [...],
      "keyPoints": [...]
    }
  ]
}
\`\`\`

## 🎨 Características

✅ **Documentación Completa** - 3 módulos con 12 temas detallados  
✅ **Visualizaciones Interactivas** - Gráficos con Recharts  
✅ **Ejemplos de Código** - Código Python listo para copiar  
✅ **Diseño Responsive** - Móvil, tablet y desktop  
✅ **Modo Oscuro** - Tema oscuro profesional por defecto  
✅ **Performance** - SSR con Next.js 16  
✅ **Accesibilidad** - Componentes ARIA compliant  
✅ **SEO Optimizado** - Metadata y Open Graph tags  

## 🔧 Scripts Disponibles

\`\`\`bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Ejecutar versión compilada
npm run lint     # Linter de código
\`\`\`

## 📦 Dependencias Principales

### Frontend
\`\`\`json
{
  "next": "16.0.3",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "typescript": "^5",
  "tailwindcss": "^4.1.9",
  "recharts": "latest",
  "lucide-react": "^0.454.0",
  "@radix-ui/react-*": "latest"
}
\`\`\`

### Backend (opcional)
\`\`\`txt
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
gunicorn==21.2.0
whitenoise==6.6.0
\`\`\`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👤 Autor

Proyecto educativo para documentación interactiva de Data Science.

## 🐛 Reportar Issues

¿Encontraste un bug? [Abre un issue](../../issues)

## ⭐ Dale una Estrella

Si este proyecto te resultó útil, considera darle una estrella ⭐

---

**Hecho con ❤️ usando Next.js, React y TypeScript**
