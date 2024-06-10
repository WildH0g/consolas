/** @module GoogleAppsScriptExportsPlugin */

import fs from 'fs';
import { resolve } from 'path';
import { injectedCode } from './injectedCode.js';

/**
 * @typedef {Object} GasExportOptions
 * @prop {boolean} [exportsFile] Whether to create a separate exports file
 * @prop {{from: string, to: string}[]} [copyFiles] The files to copy
 */

/**
 * Extracts the exports as stand-alone functions
 * @param {string} origPath The file to extract the exports from
 * @param {string} exportsPath The file to extract the exports to
 * @param {string} varName The name of the variable that stores the return value of the IIFE
 * @param {GasExportOptions} [options] The options for the plugin
 */
export async function GoogleAppsScriptExportsPlugin(
  origPath = 'dist/server/server.iife.js',
  exportsPath = 'dist/exports.js',
  varName = 'lib_',
  options = { exportsFile: true, copyFiles: [] }
) {
  return {
    name: 'vite-plugin-appscript',
    async closeBundle() {
      const tempPath = resolve(
        process.cwd(),
        origPath.replace(/\.js$/, '.temp.js')
      );
      try {
        fs.copyFileSync(resolve(process.cwd(), origPath), tempPath);
        fs.appendFileSync(tempPath, injectedCode(varName, exportsPath), 'utf8');
        const { execSync } = await import('child_process');
        execSync(`node ${tempPath}`);
        fs.unlinkSync(tempPath);

        if (false === options.exportsFile) {
          const exp = fs.readFileSync(
            resolve(process.cwd(), exportsPath),
            'utf8'
          );
          fs.appendFileSync(
            resolve(process.cwd(), origPath),
            `\n${exp}`,
            'utf8'
          );
          fs.unlinkSync(resolve(process.cwd(), exportsPath));
        }
      } catch (err) {
        console.error(`Could not create exports: ${err}`);
      }

      if (!options.copyFiles || !options.copyFiles.length) return;
      options.copyFiles.forEach((file) => {
        fs.copyFileSync(
          resolve(process.cwd(), file.from),
          resolve(process.cwd(), file.to)
        );
      });
    },
  };
}
