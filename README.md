# Laboratorio 09 · Introducción a Next.js

Proyecto independiente del backend Express. Incluye los dos ejercicios de la guía y la actividad integradora **Galería de Películas y Series**, con diseño propio «plano».

## Requisitos y ejecución en Windows

- Node.js 20.9 o superior y npm. Equipo verificado con Node 24.
- Internet para OMDb, PokeAPI y Open-Meteo.
- Una clave propia de OMDb, activada mediante el correo de registro: https://www.omdbapi.com/apikey.aspx

Desde PowerShell, dentro de esta carpeta:

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
notepad .env.local
# Agrega tu clave: OMDB_API_KEY=tu_clave
npm.cmd run dev
```

Abre http://localhost:3000. Reinicia el servidor después de cambiar `.env.local`. Se usa `npm.cmd` porque PowerShell puede bloquear `npm.ps1`. No hace falta cambiar la política de ejecución.

Sin clave, la aplicación abre y explica cómo configurarla; no muestra películas inventadas. La búsqueda devolverá un aviso de configuración pendiente.

## Rutas

| Ruta | Función | Estrategia |
| --- | --- | --- |
| `/` | Selección inicial Marvel | SSR por solicitud |
| `/#busqueda` | Búsqueda, filtros, paginación y ficha completa | CSR con useState y useEffect |
| `/pokemon-csr` | Pokémon aleatorio | Petición desde el navegador |
| `/pokemon-ssr` | Pokémon aleatorio | Petición desde el servidor |
| `/weather` | Lima y selector de ciudades | Lima SSR y widget mundial CSR |
| `/api/movies` | Intermediario para búsquedas y detalles OMDb | Clave solo en servidor |

OMDb no ofrece un endpoint de películas populares. La portada presenta una selección de títulos conocidos mediante `s=marvel`, sin afirmar que sea un ranking de popularidad.

## Justificación CSR y SSR

La portada es un componente servidor asíncrono. Obtiene la selección antes de construir el HTML para que los títulos estén disponibles al recibir la página. `dynamic = 'force-dynamic'` evita convertir esta demostración en una página estática durante el build.

La búsqueda usa `'use client'`, `useState` para filtros, resultados y selección, y `useEffect` para consultar después de escribir. Una espera de 450 ms reduce solicitudes y AbortController cancela solicitudes obsoletas. Axios usa async/await. El navegador llama al intermediario `/api/movies`; el renderizado de resultados ocurre en el cliente aunque la clave permanezca en el servidor. La ficha se muestra en la misma página sin recargar. La portada enlaza una ficha mediante el parámetro `movie`.

El clima de Lima se obtiene en el servidor, mientras el selector mundial necesita estado y efectos para cambiar de ciudad sin recarga. SSR y CSR se combinan: SSR no impide la interactividad. Sus tiempos dependen de red, JavaScript y proveedor; no hay garantía universal de que uno siempre sea más rápido.

## Verificación

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run typecheck
npm.cmd start
```

La plantilla opcional [docs/ci.yml.example](docs/ci.yml.example) ejecuta lint y build en GitHub. Para activarla, crea `.github/workflows/ci.yml` desde la web de GitHub copiando ese contenido, o súbela con una credencial que permita modificar workflows. No necesita la clave para compilar. El proyecto es Next.js con servidor; no se publica directamente en GitHub Pages.

Pruebas del navegador y respuestas esperadas: [docs/ENTREGA.md](docs/ENTREGA.md). No sustituyen una ejecución observada: registra tus propias capturas y mediciones con la clave activa.

## Crear el repositorio de GitHub

Esta carpeta debe ser la raíz del nuevo repositorio. No subas el backend Express ni `.env.local`.

1. El repositorio de este proyecto es `SHEILA-DIAZ/laboratorio09-web`. Para repetir el proceso con otro repositorio, créalo vacío, sin README, licencia ni gitignore porque ya existen aquí.
2. En una terminal ubicada en **esta carpeta**, ejecuta:

```powershell
git init -b main
git add .
git status
git commit -m "Completar laboratorio 09 de Next.js"
git remote add origin https://github.com/SHEILA-DIAZ/laboratorio09-web.git
git push -u origin main
```

Si el repositorio local ya está inicializado, omite `git init`. Si Git solicita identidad, configura tu nombre y correo con `git config user.name "Tu nombre"` y `git config user.email "tu correo"` dentro de esta carpeta. Autentícate con el navegador o Git Credential Manager cuando Git lo solicite; no guardes contraseñas o tokens en archivos del proyecto.

Repositorio de entrega: https://github.com/SHEILA-DIAZ/laboratorio09-web. El remoto `origin` ya está configurado localmente; omite `git remote add` si aparece al ejecutar `git remote -v`. Una entrega con enlace debe ser accesible para el docente.

Si luego despliegas en un servicio compatible con Next.js, configura `OMDB_API_KEY` como variable del servidor. No uses el workflow de despliegue del backend Express para esta aplicación.

## Fuentes

- Next.js: https://nextjs.org/docs/app/getting-started/installation
- OMDb y parámetros: https://www.omdbapi.com/
- Open-Meteo: https://open-meteo.com/en/docs
- PokeAPI: https://pokeapi.co/docs/v2
