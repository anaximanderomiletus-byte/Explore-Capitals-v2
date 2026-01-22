import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    // Gemini API key removed for security - AI image generation disabled
    // To re-enable, use a backend serverless function instead of client-side key
    'process.env.API_KEY': JSON.stringify(''),
    'process.env.GEMINI_API_KEY': JSON.stringify('')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
