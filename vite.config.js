import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/motion|framer/.test(id)) return 'motion';
          if (/react-hook-form|zod|@hookform/.test(id)) return 'forms';
          if (/react-dom|react-router|scheduler|react-helmet/.test(id) || /node_modules[\\/]react[\\/]/.test(id)) return 'react';
        },
      },
    },
  },
});
