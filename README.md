# Landing Page de Planes de Salud - OSPADEP, Swiss Medical, Omint y Medifé

Una landing page de alta conversión y optimizada para SEO que promociona planes de salud de los principales prestadores médicos en Argentina.

## 🚀 Características

### Diseño y UX
- **Diseño responsive** que se adapta a todos los dispositivos
- **Paleta de colores profesional** con azul como color principal
- **Animaciones suaves** y transiciones elegantes
- **Formulario integrado de Pipedrive** para captura de leads
- **Optimización para conversión** con CTAs estratégicamente ubicados

### SEO y Performance
- **SEO optimizado** con meta tags completos
- **Schema markup** para mejor indexación
- **Carga rápida** (menos de 3 segundos)
- **Core Web Vitals** optimizados
- **Accesibilidad mejorada** con navegación por teclado

### Funcionalidades Técnicas
- **Formulario Pipedrive integrado** con tracking de eventos
- **Google Analytics** configurado
- **Modal de éxito** post-envío del formulario
- **Scroll suave** y efectos parallax
- **Manejo de errores** robusto

## 📁 Estructura del Proyecto

```
health-care-landing/
├── index.html          # Página principal
├── styles.css          # Estilos personalizados
├── script.js           # JavaScript funcional
├── assets/             # Carpeta de imágenes
│   ├── logo-ospadep.png
│   ├── logo-swiss-medical.png
│   ├── logo-omint.png
│   └── logo-medife.png
├── prompt.json         # Especificaciones del proyecto
└── README.md          # Documentación
```

## 🛠️ Instalación y Uso

### Requisitos
- Navegador web moderno
- Servidor web (opcional para desarrollo local)

### Instalación Local

1. **Clona o descarga el proyecto**
   ```bash
   git clone [url-del-repositorio]
   cd health-care-landing
   ```

2. **Abre el archivo index.html**
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

3. **Accede a la página**
   - Abre tu navegador y ve a `http://localhost:8000`

## 🎨 Personalización

### Colores
Los colores principales están definidos en `styles.css`:
- **Primario**: `#2563eb` (azul)
- **Secundario**: `#ffffff` (blanco)
- **Acento**: `#bbf7d0` (verde claro)

### Formulario Pipedrive
El formulario está integrado con el siguiente código:
```html
<div class="pipedriveWebForms" data-pd-webforms="https://webforms.pipedrive.com/f/bXxLOqGBjnIMD56x65m7GOu9udRvyuVVICsp2Uuqhrq2OTLdLhIgQROp6h682ObYZR">
    <script src="https://webforms.pipedrive.com/f/loader"></script>
</div>
```

### Logos
Reemplaza los placeholders en la sección "Confían en nosotros" con los logos reales:
- `assets/logo-ospadep.png`
- `assets/logo-swiss-medical.png`
- `assets/logo-omint.png`
- `assets/logo-medife.png`

## 📊 Analytics y Tracking

### Eventos Rastreados
- **Page View**: Visualización de página
- **Form Field Focus**: Enfoque en campos del formulario
- **Form Submit Click**: Clic en botón de envío
- **Form Submit Success**: Envío exitoso del formulario
- **Core Web Vitals**: LCP, FID, CLS

### Configuración de Google Analytics
Reemplaza `GA_MEASUREMENT_ID` en `index.html` con tu ID de Google Analytics:
```javascript
gtag('config', 'TU_GA_ID_AQUI');
```

## 🔧 Configuración Avanzada

### Variables de Entorno
Para producción, considera agregar:
- Google Analytics ID
- Pipedrive Webhook URL
- Email de contacto

### Optimizaciones de Performance
- **Compresión de imágenes**: Optimiza los logos antes de subir
- **Minificación**: Considera minificar CSS y JS para producción
- **CDN**: Usa un CDN para assets estáticos

## 📱 Responsive Design

La página está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## ♿ Accesibilidad

### Características Implementadas
- **Navegación por teclado** completa
- **Skip links** para usuarios de lectores de pantalla
- **Contraste alto** en todos los elementos
- **Textos alternativos** en imágenes
- **ARIA labels** donde es necesario

## 🚀 Despliegue

### Opciones de Hosting
1. **Netlify**: Arrastra la carpeta al dashboard
2. **Vercel**: Conecta tu repositorio Git
3. **GitHub Pages**: Sube a un repositorio público
4. **Hosting tradicional**: Sube archivos via FTP

### Configuración de Dominio
- Configura tu dominio personalizado
- Activa HTTPS
- Configura redirecciones si es necesario

## 🐛 Solución de Problemas

### Formulario no carga
- Verifica la conexión a internet
- Revisa la consola del navegador para errores
- Confirma que el código de Pipedrive sea válido

### Problemas de Performance
- Optimiza imágenes
- Verifica la velocidad de carga con PageSpeed Insights
- Considera usar un CDN

### Problemas de SEO
- Verifica meta tags con herramientas de SEO
- Confirma que el schema markup sea válido
- Revisa la estructura de encabezados

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Revisa la documentación de Pipedrive
- Consulta la documentación de Tailwind CSS
- Verifica la consola del navegador para errores

## 📄 Licencia

Este proyecto está diseñado para uso comercial. Asegúrate de tener los derechos necesarios para usar los logos y marcas comerciales.

## 🔄 Actualizaciones

### Versión 1.0.0
- Landing page inicial
- Integración con Pipedrive
- SEO básico implementado
- Diseño responsive

### Próximas Mejoras
- [ ] A/B testing integrado
- [ ] Chat en vivo
- [ ] Más opciones de personalización
- [ ] Integración con CRM adicional

---

**Desarrollado con ❤️ para optimizar la conversión de planes de salud en Argentina** 