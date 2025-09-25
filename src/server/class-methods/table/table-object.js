import TypeCheck from '../../helpers/type-checkers.js';
import twoDimArrToTable from './table-2d-array.js';

/**
 * Converts an object to a markdown table
 * @param {object} obj - The object to convert to a table
 * @returns {string|TwoDimArray} - The markdown table
 */
export default function objectToTable(obj) {
  if (!TypeCheck.isObject(obj)) throw 'This is not an object';
  const headers = ['(index)', 'Value'];

  let body = buildBody(obj, headers)
    .map((row) =>
      row.map((/** @type {any} */ cell) => {
        return !!cell && undefined !== cell ? cell : '';
      })
    )
    .map((row) => {
      const diff = headers.length - row.length;
      for (let i = 0; i < diff; i++) row.push('');
      return row;
    });

  const table = [headers, ...body];

  return twoDimArrToTable(table, { addIndices: false });
}

/**
 * @param {Array<*>} ar
 * @returns {Object<number, *>}
 */
function arToObj(ar) {
  if (!Array.isArray) return ar;
  return ar.reduce((acc, item, i) => {
    acc[i] = item;
    return acc;
  }, {});
}

/**
 * @param {TwoDimArray} entries
 * @param {Array<string>} headers
 * @param {string} key
 * @param {Boolean} isArray
 * @returns
 */
function buildNestedObj(entries, headers, key, isArray) {
  entries.forEach((entry) => {
    if (-1 !== headers.indexOf(entry[0])) return;
    headers.push(entry[0]);
  });
  return entries.reduce(
    (acc, [k, v]) => {
      if (TypeCheck.isObject(v))
        return buildNestedObj(Object.entries(v), headers, key, false);
      const idx = headers.findIndex((header) => header === k);
      acc[idx] = v;
      return [...acc].map((cell) =>
        undefined !== cell ? cell : isArray ? '' : '{...}'
      );
    },
    [key, '']
  );
}

/**
 * @param {object} obj
 * @param {string[]} headers
 * @returns {TwoDimArray}
 */
function buildBody(obj, headers) {
  const entries = Object.entries(obj);
  const result = entries.map(([key, value]) => {
    let isArray = false;
    if (Array.isArray(value)) {
      value = arToObj(value);
      isArray = true;
    }
    if (!TypeCheck.isObject(value)) return [key, value];
    return buildNestedObj(Object.entries(value), headers, key, isArray);
  });
  return result;
}

/*
| (index)    | Value     | street          | city    | state | zip   |
| ---------- | --------- | --------------- | ------- | ----- | ----- |
| name       | John Doe  |                 |         |       |       |
| address    |           | 123 Main Street | Anytown | CA    | 12345 |
| profession | Developer |                 |         |       |       |
*/
