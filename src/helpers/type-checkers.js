/**
 * Checks whether argument is a two-dimensional array
 * @param {*} arg
 * @returns {boolean}
 */
function isTwoDimAr(arg) {
  return Array.isArray(arg) && Array.isArray(arg?.[0]);
}

function isObject(obj) {
  return 'object' === typeof obj && !Array.isArray(obj);
}

const TypeCheck = {
  isTwoDimAr,
  isObject,
};

export default TypeCheck;
