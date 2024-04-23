/*
*
* SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/console
*
*/

import twoDimArrToTable from './class-methods/table-2d-array.js';

/**
 * This class is a polyfill for the console object.
 * @class
 */
export const ConsoleX = (function () {
  /**
   * Indicates whether the console object has been polyfilled.
   * @type {WeakMap<ConsoleX, *>}
   */
  const POLYFILLED = new WeakMap();

  /**
   * The Console methods to polyfill.
   * @type {Array<string>}
   */
  const METHODS_TO_POLYFILL = ['table'];

  /**
   * The Console methods to inherit from the native console object.
   * @type {Array<string>}
   */
  const METHODS_TO_INHERIT = ['log', 'warn', 'error'];

  /**
   * The Console calls history.
   * @type {WeakMap<ConsoleX, string[]>}
   */
  const CALLS_HISTORY = new WeakMap();

  /**
   * Adds console methods to Apps Script. Optionally polyfills the console object.
   * @constructor
   */

  class ConsoleX {
    constructor() {
      if (ConsoleX.instance) return ConsoleX.instance;
      POLYFILLED.set(this, false);
      CALLS_HISTORY.set(this, []);
      METHODS_TO_INHERIT.forEach((method) => (this[method] = console[method]));
      ConsoleX.instance = this;
      return ConsoleX.instance;
    }

    /**
     * Polyfills the Console object.
     * @returns {ConsoleX}
     */
    polyfill() {
      if (this.isPolyfilled) return this;
      METHODS_TO_POLYFILL.forEach((method) => {
        if (!(method in Object.getPrototypeOf(console)))
          Object.getPrototypeOf(console)[method] = this[method].bind(this);
      });
      POLYFILLED.set(this, true);
      return this;
    }

    /**
     * Indicates if the console object has been polyfilled.
     * @returns {boolean}
     */
    get isPolyfilled() {
      return POLYFILLED.get(this);
    }

    /**
     * Prints arrays and objects in markdown table format.
     * @param {TwoDimArray} ar
     * @returns {string} - The
     */
    table(ar) {
      const output = addToHistory_(twoDimArrToTable(ar), this);
      console.log(output);
      return output;
    }

    // TODO: Implement the assert method
    assert() {
      console.log('⏳ Not implemented yet')
    }

    // TODO: Implement the group methods  
    group() {
      console.log('⏳ Not implemented yet')
    }

    // TODO: Implement the dir method
    dir() {
      console.log('⏳ Not implemented yet')
    }

    // TODO: Implement the count method
    count() {
      console.log('⏳ Not implemented yet')
    }

    // TODO: Implement the countReset method
    countReset() {
      console.log('⏳ Not implemented yet')
    }

    // TODO: Implement the help method
    help() {
      console.log('⏳ Not implemented yet')
    }
  }

  /** @type {null|ConsoleX} */
  ConsoleX.instance = null;

  /**
   * Adds an output to the class history.
   * @param {string} output
   * @param {ConsoleX} parent
   * @returns {string}
   */
  function addToHistory_(output, parent) {
    CALLS_HISTORY.get(parent).push(output);
    return output;
  }

  return ConsoleX;
})();
