import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isElectronBuild = process.env.BUILD_TARGET === 'electron';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: isElectronBuild ? './' : '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
