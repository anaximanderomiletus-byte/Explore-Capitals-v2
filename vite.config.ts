import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <--- The "GPS" Fix for custom domains
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
    // Optimize chunk splitting for better caching and loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - cached separately from app code
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          // Firebase in its own chunk (large)
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 800,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Use esbuild for minification (built into Vite, fast)
    minify: 'esbuild',
    // Generate source maps for debugging (optional, can be false for smaller deploys)
    sourcemap: false,
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
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
  },
});
