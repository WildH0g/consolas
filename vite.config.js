import { defineConfig } from 'vite';
import { resolve } from 'path';
import { AppsScriptPlugin } from './vite-plugin/vite-plugin-appsscript.js';

export default defineConfig({
  plugins: [AppsScriptPlugin('dist/lib/consolas.js')],
  build: {
    minify: true,
    outDir: resolve(process.cwd(), 'dist/lib'),
    lib: {
      entry: resolve(process.cwd(), 'src/app.js'),
      name: 'ConsolAS',
      fileName: 'consolas',
      formats: ['es'],
    },
  },
});
