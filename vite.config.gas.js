import { defineConfig } from 'vite';
import { resolve } from 'path';
import { AppsScriptPlugin } from './vite-plugin/vite-plugin-appsscript.js';

export default defineConfig({
  plugins: [AppsScriptPlugin('dist/gas-lib/consolas.iife.js', 'init')],
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/gas-lib'),
    lib: {
      entry: resolve(process.cwd(), 'src/gas-app.js'),
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
