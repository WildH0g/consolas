import TypeCheck from '../helpers/type-checkers.js';
import twoDimArrToTable from './table-2d-array.js';

/**
 * Converts an array of objects to a markdown table
 * @param {object[]} objAr
 */
export default function objectArrayToTable(objAr) {
  if (!TypeCheck.isObjectArray(objAr)) throw 'This is not an object array';
  const headerIndices = {};
  let lastUsedIndex = -1;
  const headers = [];
  let body = [];

  // Loop through objects and add keys to headers and values to body
  for (const obj of objAr) {
    const entries = Object.entries(obj);
    const row = new Array(entries.length).fill('');
    entries.forEach(([key, value]) => {
      if (!(key in headerIndices)) {
        headerIndices[key] = ++lastUsedIndex;
        headers.push(key);
      }
      row[headerIndices[key]] = value;
    });
    body.push(row);
  }

  // Replace <empty cells> with emtpy strings
  body.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (!(i in row)) row[i] = '';
    }
  });

  // If row is shorter than the headers, push empty strings to fill
  body.forEach((row) => {
    if (row.length === headers.length) return;
    const diff = headers.length - row.length;
    for (let i = 0; i < diff; i++) row.push('');
  });

  const twoDimArray = [headers, ...body];
  return twoDimArrToTable(twoDimArray, { addIndices: 'row-only' });
}
