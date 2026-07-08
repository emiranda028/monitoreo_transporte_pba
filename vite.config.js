import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Si vas a publicar en GitHub Pages en un repo que NO es <usuario>.github.io,
// descomentá la línea de "base" y poné el nombre exacto de tu repositorio.
export default defineConfig({
  plugins: [react()],
  base: "/monitoreo_transporte_pba/",
});
