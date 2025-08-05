import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // importante para rutas relativas en Netlify
  plugins: [react()]
});
