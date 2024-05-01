import { defineConfig } from 'vite';
import { resolve } from 'path';
// import { AppsScriptPlugin } from './vite-plugin/vite-plugin-appsscript.js';

export default defineConfig({
  // plugins: [AppsScriptPlugin('dist/copy-paste/consolas.js', 'dist/gas-lib/consolas.js', 'init')],
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/gas-lib'),
    lib: {
      entry: resolve(process.cwd(), 'src/app.js'),
      name: 'init',
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
