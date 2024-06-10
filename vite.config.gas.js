import { defineConfig } from 'vite';
import { resolve } from 'path';
import { GoogleAppsScriptExportsPlugin } from './vite-plugin/vite-plugin-appsscript.js';

export default defineConfig({
  plugins: [
    GoogleAppsScriptExportsPlugin(
      'dist/gas-lib/consolas.iife.js',
      'dist/gas-lib/exports.js',
      'lib_',
      {
        copyFiles: [
          {
            from: 'appsscript.json',
            to: 'dist/gas-lib/appsscript.json',
          },
        ],
      }
    ),
  ],
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/gas-lib'),
    lib: {
      entry: resolve(process.cwd(), 'src/gas-app.js'),
      name: 'lib_',
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
