# Documentos descargables

Coloca aquí los archivos que la tarjeta ofrece para descargar y luego indica su ruta en `CONFIG` (script.js):

| Archivo sugerido            | Campo en CONFIG  | Si se deja vacío                                       |
|-----------------------------|------------------|--------------------------------------------------------|
| `cv.pdf`                    | `cv`             | El botón avisa que el CV está pendiente                |
| `catalogo-servicios.pdf`    | `catalog`        | Se genera un catálogo imprimible a partir de `services` |

Ejemplo:

```js
cv: 'assets/docs/cv.pdf',
catalog: 'assets/docs/catalogo-servicios.pdf',
```
