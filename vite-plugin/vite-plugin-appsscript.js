import fs from 'fs';
import cliToObject from 'cli-options-parser';

/**
 * Removes the export statement from the generated code for the Apps Script environment
 * @param {string} inputPath - The path to the code to process
 * @param {string} outputPath - The path to the new code
 * @param {string} propName - The name of the prperty to extract from the IIFE
 * @returns {object} - Rollup plugin object
 */
export function AppsScriptPlugin(inputPath, outputPath, propName) {
  // return {
    // name: 'vite-plugin-appscript-library',
    // async closeBundle() {
      // return;
      let data = fs.readFileSync(inputPath, 'utf8');
      // const re =
      //   /export\s+\{\s*([a-z0-9_$])+\s+as\s+([a-z0-9_$]*)\n*};?[\s\n]*/gis;
      // const matches = re.exec(data);
      // if (null === matches) return;
      // data = `const ${matches[2]} = (() => {\n${data.replace(
      //   re,
      //   ''
      // )} \n\nreturn ${matches[1]}\n})();`;
      // data =( await minify(data, { sourceMap: true })).code;
      data += `\n${propName} = ${propName}.${propName};`
      fs.mkdirSync(outputPath.split('/').slice(0, -1).join('/'), { recursive: true });
      fs.writeFileSync(outputPath, data, 'utf8');
      fs.copyFileSync('appsscript.json', 'dist/gas-lib/appsscript.json')
    // },
  // };
}

const obj = cliToObject();
AppsScriptPlugin(obj['--in'], obj['--out'], obj['--prop']);
