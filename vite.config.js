import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // پوشه خروجی بیلد
    rollupOptions: {
      input: {
        main: '/index.html'
      }
    }
  }
});
