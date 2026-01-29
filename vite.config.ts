import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <--- The "GPS" Fix for custom domains
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Chunk splitting for better caching and parallel loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate heavy dependencies for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          // Data chunks - separate large data files
          'staticTours': ['./data/staticTours.ts'],
          'officialNames': ['./data/officialNames.ts'],
          'images': ['./data/images.ts'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
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
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['firebase'],
  },
});
