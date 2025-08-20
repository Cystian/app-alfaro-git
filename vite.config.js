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
  build: {
    rollupOptions: {
      external: ['@supabase/supabase-js'], // 👈 deja solo supabase
    },
  },
  optimizeDeps: {
    include: ['jspdf'], // 👈 esto fuerza a Vite a preempacar jspdf
  },
});
