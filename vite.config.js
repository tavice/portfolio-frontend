import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: false },
  build: { outDir: 'dist' },
  // Bundle these into the SSR build so Node ESM/CJS interop doesn't break default imports
  ssr: { noExternal: ['styled-components', 'framer-motion', 'react-icons'] },
  // Keep the existing REACT_APP_RENDER_URL variable working in Netlify
  envPrefix: ['VITE_', 'REACT_APP_'],
});
