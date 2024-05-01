import { ConsolAS } from "./app.js";

/**
 * 
 * @param {{polyfill: [Boolean]}} opts 
 * @returns 
 */
export function init(opts) {
  const polyfill = opts?.polyfill || false;
  if (polyfill) return new ConsolAS().polyfill();
  return new ConsolAS();
}