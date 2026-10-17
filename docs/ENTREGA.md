# Guía de evidencia del laboratorio

Este archivo contiene explicaciones y un borrador de conclusiones. Completa las mediciones y capturas después de ejecutar la aplicación. No se incluyen resultados de navegador inventados.

## Capturas pendientes

Guarda tus capturas en `docs/capturas/` y agrégalas a tu documento de entrega:

1. `/pokemon-csr` con el Pokémon y Network filtrado por `pokemon`.
2. `/pokemon-ssr` y su código fuente con el nombre ya presente.
3. `/weather` con Lima y una ciudad mundial; luego cambia la ciudad y captura Network.
4. `/` con la selección Marvel cargada mediante tu clave OMDb.
5. Búsqueda de películas y búsqueda de series con resultados.
6. Ficha de una película o serie abierta en la misma página.

## Pruebas en DevTools

Para medir, usa `npm.cmd run build` y `npm.cmd start`. Abre las rutas escribiendo la URL completa. Limpia Network antes de cada recarga, desactiva la caché y filtra por Fetch/XHR. En desarrollo React puede repetir efectos para detectar problemas y Next.js puede solicitar precargas; no confundas esas peticiones con solicitudes de datos del ejercicio.

| Página | ¿Cuándo aparece el contenido? | Peticiones de datos esperadas en el navegador |
| --- | --- | --- |
| Pokémon CSR | Tras cargar JS, ejecutar el efecto y recibir PokeAPI | 1 a PokeAPI por montaje en producción |
| Pokémon SSR | El nombre y tipos llegan en el HTML generado en el servidor | 0 a PokeAPI desde el navegador; 1 desde el servidor |
| Clima híbrido | Lima llega con HTML; ciudad mundial después del efecto | 1 a Open-Meteo para ciudad mundial; otra por cambio de ciudad |
| Galería inicial | Títulos de Marvel llegan en HTML si la clave funciona | 0 solicitudes OMDb desde navegador; 1 desde servidor |
| Búsqueda | Después de escribir 3 caracteres, esperar 450 ms y recibir la respuesta | 1 a `/api/movies` por búsqueda estable/filtro/página |
| Detalle | Después de seleccionar y recibir respuesta | 1 a `/api/movies?id=…` |

Los pósteres, sprites, scripts, HTML y CSS agregan peticiones. El total de Network no es un número fijo. Las navegaciones con enlaces pueden usar solicitudes de React Server Components. Una petición cancelada o un efecto repetido puede alterar lo observado.

### Registro de observaciones reales

- Pokémon CSR: tiempo observado ___; peticiones de datos ___; total ___; captura ___
- Pokémon SSR: tiempo observado ___; peticiones de datos ___; total ___; captura ___
- Clima: tiempo observado ___; peticiones iniciales ___; al cambiar ciudad ___; captura ___
- Galería: tiempo observado ___; búsqueda ___; detalles ___; captura ___

### Casos funcionales

- Sin clave OMDb: mensaje de configuración; la aplicación sigue abriendo.
- Con clave válida: portada con títulos reales y búsqueda por nombre.
- Menos de tres caracteres: no consultar la API de búsqueda.
- Cambiar rápidamente la consulta: conservar solo resultados de la última consulta.
- Filtrar series, paginar y abrir una ficha sin recargar.
- Búsqueda sin coincidencias: mensaje visible.
- Desconectar la red: error visible; permitir volver a intentar escribiendo otra búsqueda o recargando.
- Revisar móvil y navegación mediante teclado.

## Cinco conclusiones propuestas para adaptar a tu experiencia

1. Comprendí que SSR permite entregar los datos iniciales en el HTML, mientras que CSR obtiene los datos después de ejecutar JavaScript. Comparar el código fuente y las peticiones ayuda a distinguirlos.
2. Combiné una portada SSR con búsqueda CSR porque la selección inicial necesita contenido disponible al abrir y los filtros necesitan actualizarse sin recargar.
3. Separé la consulta OMDb en el servidor para mantener la clave fuera del código del navegador. Usar variables de entorno también facilita configurar el proyecto en otro equipo.
4. El manejo de carga, errores y cancelación evita que una consulta antigua reemplace una búsqueda reciente. La espera antes de consultar reduce el consumo de solicitudes.
5. SSR y CSR tienen ventajas que dependen del caso. El dashboard híbrido muestra que se pueden combinar; para evaluar su rendimiento debo medir la aplicación y considerar la red y la API, no asumir que una estrategia siempre es superior.

## Enlace del repositorio

Repositorio de entrega: https://github.com/SHEILA-DIAZ/laboratorio09-web.
