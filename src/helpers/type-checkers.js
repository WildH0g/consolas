/**
 * Checks whether argument is a two-dimensional array
 * @param {*} arg
 * @returns {boolean}
 */
function isTwoDimAr(arg) {
  return Array.isArray(arg) && Array.isArray(arg?.[0]);
}

/**
 * Checks whether the argument is an object
 * @param {*} obj
 * @returns
 */
function isObject(obj) {
  return 'object' === typeof obj && !Array.isArray(obj);
}

/**
 * Checks whether the argument is an array of objects
 * @param {*} obj
 * @returns
 */
function isObjectArray(obj) {
  return Array.isArray(obj) && obj.every(isObject);
}

const TypeCheck = {
  isTwoDimAr,
  isObject,
  isObjectArray,
};

export default TypeCheck;
