/*
 *
 * SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/console
 *
 */

import twoDimArrToTable from './class-methods/table-2d-array.js';
import objectToTable from './class-methods/table-object.js';
import objectArrayToTable from './class-methods/table-object-array.js';
import TypeCheck from './helpers/type-checkers.js';
import polyfillRequire from './helpers/require-polyfill.js';

polyfillRequire();
// @ts-ignore
// require('google-apps-script');

/**
 * @typedef {Object} TreeOptions
 * @property {number} [maxDepth=5] - The maximum depth of the tree.
 * @property {number} [maxFolders=10] - The maximum number of folders to display.
 * @property {number} [maxFiles=20] - The maximum number of files to display.
 */

/**
 * This class is a polyfill for the console object.
 * @class
 */
export const ConsolAS = (function () {
  /**
   * Indicates whether the console object has been polyfilled.
   * @type {WeakMap<ConsolAS, *>}
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
   * @type {WeakMap<ConsolAS, string[]>}
   */
  const CALLS_HISTORY = new WeakMap();

  /**
   * Adds console methods to Apps Script. Optionally polyfills the console object.
   * @constructor
   */

  class ConsolAS {
    constructor() {
      if (ConsolAS.instance) return ConsolAS.instance;
      POLYFILLED.set(this, false);
      CALLS_HISTORY.set(this, []);
      METHODS_TO_INHERIT.forEach((method) => (this[method] = console[method]));
      ConsolAS.instance = this;
      return ConsolAS.instance;
    }

    /**
     * Polyfills the Console object.
     * @returns {ConsolAS}
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
     * @param {TwoDimArray | object} ar
     * @returns {string} - The
     */
    table(ar) {
      const typeMap = {
        isTwoDimAr: twoDimArrToTable,
        isObject: objectToTable,
        isObjectArray: objectArrayToTable,
      };

      const fn = Object.keys(typeMap).reduce((fn, type) => {
        if (!fn && TypeCheck[type](ar)) return typeMap[type];
        return fn;
      }, null);

      if (null === fn) throw new Error('Cannot convert input to table');

      const output = addToHistory_(fn(ar), this);
      console.log(output);
      return output;
    }

    // TODO: Implement the tree method
    /**
     *
     * @param {GoogleAppsScript.Drive.Folder} folder
     * @param {TreeOptions} options
     */
    tree(folder, options) {
      console.log('⏳ Method "tree" not implemented yet');
    }

    // TODO: Implement the assert method
    assert() {
      console.log('⏳ Method "assert" not implemented yet');
    }

    // TODO: Implement the group methods
    group() {
      console.log('⏳ Method "group" not implemented yet');
    }

    // TODO: Implement the dir method
    dir() {
      console.log('⏳ Method "dir" not implemented yet');
    }

    // TODO: Implement the count method
    count() {
      console.log('⏳ Method "count" not implemented yet');
    }

    // TODO: Implement the countReset method
    countReset() {
      console.log('⏳ Method "countReset" not implemented yet');
    }

    // TODO: Implement the help method
    help() {
      console.log('⏳ Method "help" not implemented yet');
    }
  }

  /** @type {null|ConsolAS} */
  ConsolAS.instance = null;

  /**
   * Adds an output to the class history.
   * @param {string} output
   * @param {ConsolAS} parent
   * @returns {string}
   */
  function addToHistory_(output, parent) {
    CALLS_HISTORY.get(parent).push(output);
    return output;
  }

  return ConsolAS;
})();
