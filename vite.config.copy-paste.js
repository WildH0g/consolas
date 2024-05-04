import { defineConfig } from 'vite';
import { resolve } from 'path';
import { AppsScriptPlugin } from './vite-plugin/vite-plugin-appsscript.js';

export default defineConfig({
  plugins: [AppsScriptPlugin('dist/copy-paste/consolas.iife.js', 'ConsolAS')],
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
