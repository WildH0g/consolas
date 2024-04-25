import TypeCheck from '../helpers/type-checkers.js';
import twoDimArrToTable from './table-2d-array.js';

/**
 * Converts an object to a markdown table
 * @param {object} obj - The object to convert to a table
 * @returns {string} - The markdown table
 */
export default function objectToTable(obj) {
  if (!TypeCheck.isObject(obj)) throw 'This is not an object';
  const headers = ['(index)', 'Value'];
  const body = Object.entries(obj).map(([key, value]) => [key, value]);
  const table = [headers, ...body];
  return twoDimArrToTable(table, { addIndices: false });
}

/*
| (index)    | Value     | street          | city    | state | zip   |
| ---------- | --------- | --------------- | ------- | ----- | ----- |
| name       | John Doe  |                 |         |       |       |
| address    |           | 123 Main Street | Anytown | CA    | 12345 |
| profession | Developer |                 |         |       |       |
*/
