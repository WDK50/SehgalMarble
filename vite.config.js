// vite.config.js  
import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react';  
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({  
  plugins: [react(), tailwindcss()],  
  build: {  
    modulePreload: { polyfill: true }        // ensure modulepreload in older browsers :contentReference[oaicite:1]{index=1}  
  }  
});
