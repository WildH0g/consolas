import fs from 'fs';
import { minify } from 'terser';
/**
 * Removes the export statement from the generated code for the Apps Script environment
 * @param {string} filePath - The path to the generated code
 * @returns {object} - Rollup plugin object
 */
export function AppsScriptPlugin(filePath) {
  return {
    name: 'vite-plugin-appscript-library',
    async closeBundle() {
      // return;
      let data = fs.readFileSync(filePath, 'utf8');
      const re =
        /export\s+\{\s*([a-z0-9_$])+\s+as\s+([a-z0-9_$]*)\n*};?[\s\n]*/gis;
      const matches = re.exec(data);
      if (null === matches) return;
      data = `const ${matches[2]} = (() => {\n${data.replace(
        re,
        ''
      )} \n\nreturn ${matches[1]}\n})();`;
      data =( await minify(data, { sourceMap: true })).code;
      fs.writeFileSync(filePath, data, 'utf8');
    },
  };
}
