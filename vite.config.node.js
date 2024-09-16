import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/node'),
    lib: {
      entry: resolve(process.cwd(), 'src/server/server.js'),
      name: 'init',
      fileName: 'app',
    },
    rollupOptions: {
      output: {
        extend: false,
      },
    },
  },
});
