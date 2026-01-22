import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The Engine Key
const API_KEY = "AIzaSyB89-8rjw3tX8wBVCwJ5COB2xCCM9I0MUc"; 

export default defineConfig({
  base: './', // <--- The "GPS" Fix for custom domains
  build: {
    outDir: 'docs', // GitHub Pages can serve from /docs
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(API_KEY),
    'process.env.GEMINI_API_KEY': JSON.stringify(API_KEY)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
