import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/copy-paste'),
    lib: {
      entry: resolve(process.cwd(), 'src/app.js'),
      name: 'ConsolAS',
      fileName: 'consolas',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        extend: false,
      },
    },
  },
});
