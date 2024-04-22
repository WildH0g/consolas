import { isTwoDimAr } from '../helpers/type-checkers.js';

/**
 * Returns a two-dimensional array as a table
 * @param {TwoDimArray} twoDimAr - The array to log out
 * @returns {string} - The output that was printed out
 */
export default function twoDimArrToTable(twoDimAr) {
  const isTypeError = !isTwoDimAr(twoDimAr);
  //@ts-expect-error
  if (isTypeError) twoDimAr = generateError_(twoDimAr, 'table(TwoDimArray)');

  if (!isTypeError) {
    // Add a column to the beginning of the table
    twoDimAr.forEach((row, i) => row.unshift(i + ''));

    // Create and add a header row to the table
    const headerRow = new Array(twoDimAr[0].length)
      .fill()
      .map((_, i) => (0 === i ? '(index)' : i - 1 + ''));

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
  const table = twoDimAr.reduce((tableStr, row, i) => {
    const rowPadded = row.map((cell, i) => pad_(cell, colWidths[i]));
    if (tableStr.length) tableStr += '\n';
    if (1 === i)
      tableStr += `|${rowPadded
        .map((cell) => cell.replace(/\|/g, '-'))
        .join(' |')
        .replace(/[^|]/g, '-')}|\n`
        .replace(/\|-/g, '| ')
        .replace(/-\|/g, ' |');
    return tableStr + `|${rowPadded.join(' |')}|`;
  }, '');

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
  const padLeft = Math.floor((cellLength - str.length) / 2) + 1;
  const padRight = cellLength - str.length - padLeft + 2;
  return `${' '.repeat(padLeft)}${str}${' '.repeat(padRight)}`;
}

/**
 * Trims an object to a certain length
 * @param {object} obj
 * @param {number} len
 * @returns {string}
 */
function trimObject_(obj, len = 25) {
  if ('object' !== typeof obj) return obj;
  let str = JSON.stringify(obj);
  if (str.length > len) str = str.substring(0, 21) + '...';
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
