/** @module GoogleAppsScriptExportsPlugin */

/**
 * Injects code into the IIFE to extract the exports
 * @param {string} varName The variable name that stores the return value of the IIFE
 * @param {string} exportsPath The path to the file to write the exports to
 * @returns {string} The imjected code
 */
export const injectedCode = (varName, exportsPath = 'dist/exports.js') =>
  [
    '(async () => {',
    '  try {',
    "    const isClass = variable => typeof variable === 'function' && /^class\\s/.test(variable.toString());",
    "    const fs = await import('fs');",
    '    const exportVars = [];',
    '    const exportFuncs = [];',
    '    for (const exp in ' + varName + ') {',
    "      'function' === typeof " + varName + "[exp] && !isClass(" + varName + "[exp]) ? exportFuncs.push(exp) : exportVars.push(exp);",
    '    }',
    "let exportsFile = '/* eslint-disable no-undef */\\n';",
    'if (exportVars.length)',
    "  exportsFile += `const { ${exportVars.join(', ')} } = " + varName + ";`;",
    'if (exportFuncs.length)',
    '  exportsFile += exportFuncs',
    '    .map(',
    '      (func) =>',
    '        `function ${func}(...args) { return ' + varName + '.${func}(...args); }`',
    '    )',
    "    .join('\\n');",
    "    fs.writeFileSync('" + exportsPath + "', exportsFile, 'utf8');",
    '  } catch (err) {',
    "    console.error('Import failed');",
    '  }',
    '})();',
  ].join('\n');
