/**
 * Polyfill for the `require` function for Google Apps Script
 * @param {string} lib - Library name
 * @returns
 */
const polyfill_ = (lib) => lib;

export default function polyfillRequire() {
  //@ts-ignore
  globalThis.require = globalThis.require || polyfill_;
}
