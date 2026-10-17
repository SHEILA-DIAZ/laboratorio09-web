# Verificación realizada · 17 de octubre de 2026

- `npm.cmd run lint`: correcto.
- `npm.cmd run build`: compilación de producción y comprobación TypeScript correctas.
- `npm.cmd run typecheck`: correcto.
- Servidor de producción local: `/`, `/pokemon-csr`, `/pokemon-ssr` y `/weather` respondieron HTTP 200.
- Con acceso de red habilitado, el HTML de `/pokemon-ssr` incluyó un sprite real de PokeAPI y no mostró estado de error.
- El HTML de `/weather` incluyó temperatura de Lima en °C y no mostró estado de error.
- Sin `OMDB_API_KEY`, `/api/movies?q=batman` respondió HTTP 503 como corresponde.
- Git inicializado en rama `main`; `.env.local`, `.next` y `node_modules` quedan excluidos.
- `npm audit --omit=dev --audit-level=high`: cero vulnerabilidades de producción.
- La auditoría completa reportó cinco alertas altas en la cadena de dependencias de desarrollo de ESLint (`braces`, `micromatch`, `fast-glob`, plugin y configuración de Next). No se aplicó `audit fix --force`, que propone retroceder la configuración de Next a otra versión mayor. Revisar actualizaciones antes de mantener el proyecto a largo plazo.

## Pendiente

La clave propia de OMDb fue configurada en `.env.local`, excluido de Git. Después de su activación se verificaron consultas reales de búsqueda (10 películas de Marvel) y de detalle con sinopsis. No se realizó automatización del navegador ni capturas; las respuestas HTML y los checks anteriores no sustituyen las pruebas visuales e interactivas indicadas en ENTREGA.md. Repositorio de entrega: https://github.com/SHEILA-DIAZ/laboratorio09-web.
