import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <--- The "GPS" Fix for custom domains
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal loading
        manualChunks: {
          // Core React - loads first, cached long-term
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Firebase - only needed for auth/data, can load async
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Framer Motion - animations, can load slightly deferred
          'vendor-motion': ['framer-motion'],
          // Icons - used across app but can be chunked
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Minification optimizations
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: false,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react({
      // Use automatic JSX runtime for smaller bundle
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['firebase'], // Don't pre-bundle firebase, let it load async
  },
});
