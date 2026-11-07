# Tarjeta digital · Ingeniero de Sistemas

Tarjeta de presentación digital premium hecha con HTML, CSS y JavaScript puro, sin frameworks ni pasos de compilación.

## Estructura

```
index.html                       Estructura de la página
styles.css                       Estilos, temas oscuro/claro, responsive y animaciones
script.js                        CONFIG (datos editables) + toda la lógica
assets/img/cover-circuit.svg     Portada de circuitos
assets/img/profile-placeholder.svg  Foto provisional [EJEMPLO]
assets/img/favicon.svg
assets/docs/                     Coloca aquí cv.pdf y el catálogo (ver LEEME.md)
```

## Configuración

Todos los datos se editan en el objeto `CONFIG`, al inicio de `script.js`:

- Nombre, profesión, especialidad, biografía y disponibilidad
- Foto y portada
- Teléfono, WhatsApp (solo dígitos con código de país) y mensaje predeterminado, correo
- LinkedIn, GitHub, sitio web, blog, portafolio, proyectos, agenda de reuniones
- Ubicación (Google Maps), CV y catálogo
- URL pública de la tarjeta (`cardUrl`), que usan el QR y el botón de compartir
- Servicios, rangos de presupuesto, experiencia, tecnologías y certificaciones

Un campo vacío (`''`) se considera **pendiente**: el botón asociado muestra un aviso que indica qué campo falta. Los contenidos marcados `[EJEMPLO]` o `example: true` son de muestra y aparecen con la etiqueta "Ejemplo" hasta que se reemplacen.

Al abrir la tarjeta en local aparece un aviso con los campos pendientes. En producción ese aviso no se muestra.

## Funciones

| Función | Cómo funciona |
|---|---|
| WhatsApp | `wa.me` con mensaje predeterminado |
| Guardar contacto | Genera un archivo vCard 3.0 (`.vcf`) compatible con Android y iPhone |
| Cotización / contratación / reunión | Formulario validado que envía la solicitud por WhatsApp o por correo (`mailto:`), sin servidor |
| Agendar reunión | Abre `meetingUrl` si existe; si no, el formulario con fecha y hora |
| Compartir | Web Share API; si el navegador no la soporta, copia el enlace |
| Código QR | Se genera en el navegador y se puede descargar como PNG |
| Catálogo | Descarga `catalog` si existe; si no, genera uno imprimible (Guardar como PDF) |
| Tema y partículas | Preferencias guardadas en `localStorage` |

Respeta `prefers-reduced-motion`: desactiva las animaciones y las partículas.

## Publicación

Es un sitio estático: sirve para GitHub Pages, Netlify, Vercel o cualquier hosting. Una vez publicado, define `CONFIG.cardUrl` con la URL final para que el QR apunte a ella.

Para probar en local basta con abrir `index.html`. Para comprobar las descargas tal como funcionarán publicadas, usa un servidor local, por ejemplo `npx serve`.

Dependencias externas por CDN, con versión fija: Lucide Icons 0.460.0, qrcodejs 1.0.0 y Google Fonts.
