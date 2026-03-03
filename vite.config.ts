import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Absolute paths required for BrowserRouter (custom domain via CNAME)
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
    rollupOptions: {
      output: {
        // Split heavy dependencies into separate cached chunks
        manualChunks: {
          // React core — shared across all chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library — used by many pages
          'vendor-motion': ['framer-motion'],
          // Firebase — only needed after user interaction
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions', 'firebase/storage'],
        },
      },
    },
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
