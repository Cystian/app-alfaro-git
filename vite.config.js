// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['jspdf'], // Fuerza a Vite a incluirlo en el bundle dev
  },
  build: {
    rollupOptions: {
      external: [], // No externalices jspdf, déjalo dentro del bundle
    },
  },
});

