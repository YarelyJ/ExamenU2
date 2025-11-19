# Guía de Contribución

¡Gracias por tu interés en contribuir a DataDocs! Esta guía te ayudará a comenzar.

## 🚀 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, abre un issue incluyendo:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Entorno (navegador, OS, versión de Node.js)

### Sugerir Mejoras

Para nuevas características o mejoras:
- Explica el caso de uso
- Describe la solución propuesta
- Considera alternativas
- Impacto en el proyecto existente

### Pull Requests

1. **Fork y clonar:**
   \`\`\`bash
   git clone https://github.com/tu-usuario/datadocs.git
   cd datadocs
   \`\`\`

2. **Crear rama:**
   \`\`\`bash
   git checkout -b feature/mi-nueva-funcionalidad
   \`\`\`

3. **Instalar dependencias:**
   \`\`\`bash
   npm install
   \`\`\`

4. **Hacer cambios y probar:**
   \`\`\`bash
   npm run dev
   npm run build
   \`\`\`

5. **Commit con mensaje descriptivo:**
   \`\`\`bash
   git commit -m "feat: agregar nueva visualización de datos"
   \`\`\`

6. **Push y crear PR:**
   \`\`\`bash
   git push origin feature/mi-nueva-funcionalidad
   \`\`\`

## 📝 Convenciones de Código

### TypeScript/React
- Usar TypeScript para todo el código
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres de componentes en PascalCase
- Nombres de archivos en kebab-case

### Estilos
- Usar Tailwind CSS utility classes
- Evitar CSS inline cuando sea posible
- Seguir el sistema de diseño existente
- Mantener consistencia visual

### Commits
Seguir [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Formato, no afecta código
- `refactor:` - Refactorización
- `test:` - Agregar tests
- `chore:` - Mantenimiento

## 🧪 Testing

Antes de enviar PR:
\`\`\`bash
npm run build    # Debe compilar sin errores
npm run lint     # Debe pasar linter
\`\`\`

## 📚 Agregar Contenido

Para agregar nuevos módulos de documentación:

1. Editar `app/api/docs/route.ts`
2. Agregar nuevo objeto en array `modules`
3. Incluir: title, description, topics, chartData, keyPoints
4. Seguir estructura existente

Ejemplo:
\`\`\`typescript
{
  id: 4,
  title: "Nuevo Módulo",
  description: "Descripción breve",
  topics: [
    {
      name: "Tema 1",
      description: "...",
      fullDescription: "...",
      code: "..."
    }
  ],
  chartData: [...],
  keyPoints: [...]
}
\`\`\`

## 🎨 Agregar Visualizaciones

Para nuevos gráficos:

1. Usar Recharts como librería
2. Agregar chartData en el módulo
3. Implementar render en `app/page.tsx`
4. Mantener consistencia de colores

## ⚡ Optimización

- Componentes pequeños y reutilizables
- Lazy loading cuando sea apropiado
- Optimizar imágenes
- Minimizar bundle size

## 🤔 ¿Necesitas Ayuda?

- Abre un issue de discusión
- Revisa issues existentes
- Lee la documentación completa

## 📋 Checklist PR

Antes de enviar:
- [ ] Código compilado sin errores
- [ ] Linter pasa sin warnings
- [ ] Cambios probados localmente
- [ ] Documentación actualizada
- [ ] Commit messages descriptivos
- [ ] PR description completa

¡Gracias por contribuir! 🎉
