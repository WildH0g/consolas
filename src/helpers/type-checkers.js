/**
 * Checks whether argument is a two-dimensional array
 * @param {*} arg 
 * @returns {boolean} 
 */
export function isTwoDimAr(arg) {
  return Array.isArray(arg) && Array.isArray(arg?.[0]);
}
