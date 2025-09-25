import assertMessage from '../src/server/class-methods/assert/assert-msg';

describe('Assert message', () => {
  it('Returns null if truthy', () => {
    expect(assertMessage(2 + 2 === 4, '')).toBeNull();
    expect(assertMessage(true, '')).toBeNull();
    expect(assertMessage('abc', '')).toBeNull();
    expect(assertMessage('number' === typeof 23, '')).toBeNull();
    expect(assertMessage(Array.isArray([1, 2, 3], ''))).toBeNull();
    expect(assertMessage(new Date() instanceof Date, '')).toBeNull();
    expect(assertMessage(1, '')).toBeNull();
    expect(
      assertMessage('There was an error in the query'.includes('error'), '')
    ).toBeNull();
  });

  it('Returns message if falsy', () => {
    const errMsg = 'Error detected.';
    expect(assertMessage(false, errMsg)).toContain(errMsg);
    expect(assertMessage(0, errMsg)).toContain(errMsg);
    expect(assertMessage(null, errMsg)).toContain(errMsg);
    expect(assertMessage(undefined, errMsg)).toContain(errMsg);
    expect(assertMessage(NaN, errMsg)).toContain(errMsg);
  });

  it('Includes string arguments in message', () => {
    const strings = 'Let us go %s and %s';
    expect(assertMessage(false, strings, 'running', 'dining')).toContain(
      'Let us go running and dining'
    );
  });

  it('Includes integer arguments in message', () => {
    const integers = 'This books costs %i Euros';
    expect(assertMessage(false, integers, 2.1)).toContain(
      'This books costs 2 Euros'
    );
  });

  it('Includes floating point arguments in message', () => {
    const floats = 'This books costs %f Euros';
    expect(assertMessage(false, floats, 2.1)).toContain(
      'This books costs 2.1 Euros'
    );
  });

  it('Includes object arguments in message', () => {
    const objects = 'This object %O contains %i entries';
    const obj = { name: 'Jonh', age: 33 };
    expect(
      assertMessage(false, objects, obj, Object.entries(obj).length)
    ).toContain(`This object ${JSON.stringify(obj)} contains 2 entries`);
  });

  it('Includes formatted objects arguments in message', () => {
    const formattedObjects = 'This object %o contains %i lines';
    const obj = { name: 'Jonh', age: 33 };
    expect(
      assertMessage(false, formattedObjects, obj, Object.entries(obj).length)
    ).toContain(`This object ${JSON.stringify(obj, null, 2)} contains 2 lines`);
  });
});
