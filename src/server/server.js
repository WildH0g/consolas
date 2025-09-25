import twoDimArrToTable from './class-methods/table/table-2d-array.js';
import objectToTable from './class-methods/table/table-object.js';
import objectArrayToTable from './class-methods/table/table-object-array.js';
import assertMessage from './class-methods/assert/assert-msg.js';
import TypeCheck from './helpers/type-checkers.js';
import cloneDeep from 'lodash/cloneDeep';

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
      METHODS_TO_INHERIT.forEach(method => (this[method] = console[method]));
      ConsolAS.instance = this;
      return ConsolAS.instance;
    }

    /**
     * Polyfills the Console object.
     * @returns {ConsolAS}
     */
    polyfill() {
      if (this.isPolyfilled) return this;
      METHODS_TO_POLYFILL.forEach(method => {
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
     * @param {TwoDimArray | object} origObj
     * @param {{returnOnly: boolean}} [options] The options object, if `returnOnly` is `true`, returns the MD table without logging it.
     * @returns {string} - The
     */
    table(origObj, options = { returnOnly: false }) {
      const typeMap = {
        isTwoDimAr: twoDimArrToTable,
        isObject: objectToTable,
        isObjectArray: objectArrayToTable,
      };

      const obj = cloneDeep(origObj);
      const fn = Object.keys(typeMap).reduce((fn, type) => {
        if (!fn && TypeCheck[type](obj)) return typeMap[type];
        return fn;
      }, null);

      if (null === fn) throw new Error('Cannot convert input to table');

      const output = addToHistory_(fn(obj), this);
      if (!options.returnOnly) console.log(output);
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

    /**
     * Asserts that an expression is truthy. If the expression is falsy, an error message is logged to the console.
     * The error message can be formatted using printf-like placeholders.
     *
     * @param {any} expression - The expression to assert.
     * @param {string} message - The base error message. Can contain placeholders like %s, %i, %O, %o.
     * @param {...any} args - Arguments to substitute into the message placeholders.
     */
    assert(expression, message, ...args) {
      const msg = assertMessage(expression, message);
      if (null === msg) return;
      console.error(message);
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
