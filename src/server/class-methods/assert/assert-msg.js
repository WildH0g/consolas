/**
 * Asserts an expression and returns an error message if the expression is falsy.
 * The error message can be formatted using printf-like placeholders.
 *
 * @param {any} expression - The expression to assert. If falsy, an error message is returned.
 * @param {string} message - The base error message. Can contain placeholders like %s, %i, %O, %o.
 * @param {...any} args - Arguments to substitute into the message placeholders.
 * @returns {string|null} An error string if the assertion fails, otherwise null.
 */
export default function assertMessage(expression, message, ...args) {
  if (!!expression) return null;
  const err = `Assertion failed: ${parseMessage(message, ...args)}`;
  return err;
}

/**
 * Parses a message string, replacing placeholders with provided arguments.
 * Supports %s (string), %i (integer), %O (JSON string), and %o (pretty JSON string).
 *
 * @param {string} message - The message string containing placeholders.
 * @param {...any} args - The arguments to substitute into the placeholders.
 * @returns {string} The formatted message string.
 */
function parseMessage(message, ...args) {
  if (!args.length) return message;

  const re = /%[a-zA-Z]/g;
  const matches = [...message.matchAll(re)];
  if (matches.length > args.length) matches.length = args.length;
  if (args.length > matches.length) args.length = matches.length;

  for (let i = args.length - 1; i >= 0; i--) {
    let arg = args[i];
    const match = matches[i];
    const matchType = match[0];
    const { index } = match;
    const argParseMap = {
      '%s': String,
      '%i': parseInt,
      '%O': i => JSON.stringify(i),
      '%o': i => JSON.stringify(i, null, 2),
    };
    if (argParseMap[matchType]) arg = argParseMap[matchType](arg);
    message = message.substring(0, index) + arg + message.substring(index + 2);
  }

  return message;
}

