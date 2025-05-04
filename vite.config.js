// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteImagemin from 'vite-plugin-imagemin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImagemin({
      // compress JPEG
      mozjpeg: { quality: 75 },
      // compress PNG
      pngquant: { quality: [0.7, 0.9] },
      // generate WebP
      webp: { quality: 75 },
      // you can also enable avif ...
      // avif: { quality: 50 },
    })
  ]
});
