import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './', // <--- The "GPS" Fix for custom domains
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
    // Performance optimizations
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    // Code splitting for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React bundle - loaded first
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library - can be deferred
          'vendor-motion': ['framer-motion'],
          // Firebase is huge - load separately
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Icons - separate chunk
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Increase chunk size warning limit (we're intentionally chunking)
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // Optimize deps for faster dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
