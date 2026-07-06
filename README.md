# Unidad de Monitoreo y Registro General de Datos del Transporte

Dashboard prototipo para la Unidad de Monitoreo y Registro General de Datos del Transporte — Ministerio de Transporte, Provincia de Buenos Aires.

## Qué es esto

Un mapa interactivo de la provincia de Buenos Aires con:
- Red vial nacional y provincial (trazado real, IGN)
- Líneas y estaciones ferroviarias reales (IGN)
- Aeropuertos y pistas reales (IGN)
- Terminales de ómnibus y estaciones de peaje reales (IGN)
- Límites de partidos + población real (INDEC, Censo 2022)
- Secciones electorales reales (Ley 5109)
- Siniestralidad vial histórica 2017-2022 (Ministerio de Transporte PBA)
- Tránsito en tiempo real opcional (TomTom Traffic API, requiere clave propia gratuita)

No hay datos simulados. Lo único aproximado (no relevado con geometría exacta) son el corredor fluvial y algunas líneas ferroviarias de carga, marcado explícitamente en el propio dashboard.

## Correrlo en tu computadora

Necesitás [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

## Publicarlo (gratis, sin backend)

### Opción A — GitHub Pages (automático, recomendado)

Este proyecto ya viene con un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que compila y publica automáticamente en cada push a `main`.

1. Creá un repositorio nuevo en GitHub y subí este proyecto:
   ```bash
   git init
   git add .
   git commit -m "Primera version"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Source → GitHub Actions**.
3. Si el nombre de tu repositorio **no** es `TU-USUARIO.github.io`, abrí `vite.config.js` y descomentá la línea `base:`, poniendo el nombre exacto de tu repo:
   ```js
   base: "/TU-REPO/",
   ```
   Guardá y volvé a hacer push.
4. A los pocos minutos tenés la URL pública en la pestaña **Actions** o en **Settings → Pages**.

### Opción B — Netlify / Vercel (drag and drop, sin Git)

```bash
npm run build
```

Esto genera una carpeta `dist/`. Arrastrala a [netlify.com/drop](https://app.netlify.com/drop) y te da una URL al instante.

## Tránsito en tiempo real (TomTom)

Esta función es opcional y depende de un tercero (no es parte de un sistema propio de la Unidad):

1. Creá una cuenta gratis en [developer.tomtom.com](https://developer.tomtom.com) (sin tarjeta de crédito).
2. Generá una API Key habilitada para **Traffic API**.
3. Pegala en el campo "Tránsito en tiempo real" del dashboard y tocá "Activar".

**Importante**: esto puede no funcionar dentro de vistas previas en sandbox (como el artifact de Claude), porque suelen bloquear peticiones a dominios externos. Una vez publicado el sitio (Opción A o B de arriba), debería funcionar normalmente, ya que TomTom Traffic API está pensada para llamarse directo desde el navegador del usuario final.

## Estructura

```
src/
  App.jsx       ← el dashboard completo (un solo componente)
  main.jsx      ← punto de entrada de React
  index.css     ← Tailwind
```

Los datos geográficos (rutas, partidos, estaciones, etc.) están embebidos directamente en `App.jsx` como constantes JavaScript. Para un proyecto de producción a más largo plazo, convendría moverlos a archivos `.json` separados en `public/` y cargarlos con `fetch` en vez de incluirlos en el bundle — hoy el archivo es pesado porque lleva toda la geometría adentro.

## Fuentes de datos

- Instituto Geográfico Nacional (IGN) — Capas SIG: red vial, ferroviaria, aérea, infraestructura de transporte
- INDEC — Censo Nacional de Población, Hogares y Viviendas 2022 (resultados definitivos)
- Ley Electoral de la Provincia de Buenos Aires N.º 5109 — secciones electorales
- Ministerio de Transporte de la Provincia de Buenos Aires — Mesa de Datos de Seguridad Vial (estadísticas 2017-2022)
- Manual de Marca "Buenos Aires" (Decreto 2020, Anexo II) — paleta institucional y tipografía
- TomTom Traffic API — incidentes de tránsito en tiempo real (opcional, requiere clave propia)
