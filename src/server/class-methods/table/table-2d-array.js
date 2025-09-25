import TypeCheck from '../../helpers/type-checkers.js';
/**
 * @typedef {boolean|string} Indices
 */

/**
 * Converts a two-dimensional array to a markdown table
 * @param {TwoDimArray | ObjectArray} twoDimAr - The array to log out
 * @param {{ addIndices?: Indices }} options - The options object
 * @returns {string} - The markdown output
 */
export default function twoDimArrToTable(twoDimAr, options = {}) {
  let { addIndices } = options;
  if (undefined === addIndices) addIndices = true;

  const isTypeError = !TypeCheck.isTwoDimAr(twoDimAr);
  //@ts-expect-error
  if (isTypeError) twoDimAr = generateError_(twoDimAr, 'table(TwoDimArray)');

  const header = [...twoDimAr[0]];

  if (!isTypeError && addIndices) {
    if ('row-only' === addIndices) twoDimAr.shift();
    // Add a column to the beginning of the table
    twoDimAr.forEach((row, i) => row.unshift(i + ''));

    // Create and add a header row to the table
    let headerRow;
    if (true === addIndices) {
      headerRow = new Array(twoDimAr[0].length)
        .fill()
        .map((_, i) => (0 === i ? '(index)' : i - 1 + ''));
    }
    if ('row-only' === addIndices) {
      headerRow = ['(index)', ...header];
    }

    twoDimAr.unshift(headerRow);
  }

  // Transform objects to strings
  twoDimAr = twoDimAr.map((row) => row.map(trimObject_));

  // Get the maximum width of each column
  const colWidths = twoDimAr.reduce((widthsAr, row) => {
    const rowLengths = row.map((cell) => (cell + '').length);
    if (!widthsAr.length) return rowLengths;
    return widthsAr.map((cellWidth, i) => {
      if (cellWidth < rowLengths[i]) return rowLengths[i];
      return cellWidth;
    });
  }, []);

  // Generate the MD table
  // @ts-ignore
  const table = twoDimAr.reduce(
    (/** @type {string} */ tableStr, /** @type {any[]} */ row, i) => {
      const rowPadded = row.map((cell, i) => pad_(cell, colWidths[i]));
      if (tableStr.length) tableStr += '\n';
      if (1 === i)
        tableStr += `|${rowPadded
          .map((cell) => cell.replace(/\|/g, '-'))
          .join('|')
          .replace(/[^|]/g, '-')}|\n`
          .replace(/\|-/g, '| ')
          .replace(/-\|/g, ' |');
      return tableStr + `|${rowPadded.join('|')}|`;
    },
    ''
  );

  return table;
}

/**
 * Adds padding to a table cell
 * @param {string} str - The string to add padding to
 * @param {number} cellLength - The space the cell occupies
 * @returns string - The padded string
 */
function pad_(str, cellLength) {
  str += '';
  const padLeft = 1;
  const padRight = cellLength - str.length - padLeft + 2;
  return `${' '.repeat(padLeft)}${str}${' '.repeat(padRight)}`;
}

/**
 * Trims an object to a certain length
 * @param {object} obj
 * @returns {string}
 */
function trimObject_(obj) {
  if ('object' !== typeof obj) return obj;
  let str = JSON.stringify(obj);
  if (str.length > 25) str = str.substring(0, 21) + '...';
  return str;
}

/**
 *
 * @param {string} input
 * @param {string} srcFn
 * @returns {TwoDimArray}
 */
function generateError_(input, srcFn) {
  input = input + '';
  if (input.length > 25) input = input.slice(0, 21) + '...';
  return [
    ['Error', 'Source', 'Input'],
    ['Invalid argument', srcFn, input],
  ];
}
