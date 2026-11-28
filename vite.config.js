import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: false },
  build: { outDir: 'dist' },
  // Keep the existing REACT_APP_RENDER_URL variable working on Vercel
  envPrefix: ['VITE_', 'REACT_APP_'],
});
