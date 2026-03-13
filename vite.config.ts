import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Absolute paths required for BrowserRouter (custom domain via CNAME)
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Split heavy dependencies into separate cached chunks
        manualChunks(id) {
          if (id.includes('react-dom') || id.includes('react-router-dom') || (id.includes('/react/') && !id.includes('react-dom'))) return 'vendor-react';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('firebase/')) return 'vendor-firebase';
          if (id.includes('/data/tours/')) return 'data-tours';
        },
      },
    },
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  server: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
