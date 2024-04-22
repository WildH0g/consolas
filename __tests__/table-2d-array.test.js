import twoDimArrToTable from '../src/class-methods/table-2d-array.js';

describe('consolex.table', () => {
  it('2D Array', () => {
    const data = [
      ['Name', 'Profession'],
      ['John Doe', 'Developer'],
      ['Jane Doe', 'Designer'],
      ['Jim Doe', 'Artist'],
    ];

    const expectedResult = `
| (index)  |    0      |     1      |
| -------- | --------- | ---------- |
|    0     |   Name    | Profession |
|    1     | John Doe  | Developer  |
|    2     | Jane Doe  |  Designer  |
|    3     | Jim Doe   |   Artist   |`.trim();

    expect(twoDimArrToTable(data)).toBe(expectedResult);
  });

  it('Wrong input', () => {
    const data =
      'This is not an array, strings are not allowed in this function';
    const expectedResult = `
|      Error        |       Source        |          Input           |
| ----------------- | ------------------- | ------------------------ |
| Invalid argument  | table(TwoDimArray)  | This is not an array,... |
    `.trim();

    //@ts-expect-error
    expect(twoDimArrToTable(data)).toBe(expectedResult);
  });

  it('Input with objects inside', () => {
    const data = [
      ['Name', 'Address'],
      [
        'John Doe',
        {
          street: '123 Main Street',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
      ],
      [
        'Jane Doe',
        {
          street: '456 Elm Street',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
      ],
      [
        'Jim Doe',
        {
          street: '789 Oak Street',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
        },
      ],
    ];

    const expectedResult = `
| (index)  |    0      |            1             |
| -------- | --------- | ------------------------ |
|    0     |   Name    |         Address          |
|    1     | John Doe  | {"street":"123 Main S... |
|    2     | Jane Doe  | {"street":"456 Elm St... |
|    3     | Jim Doe   | {"street":"789 Oak St... |`.trim();

  expect(twoDimArrToTable(data)).toBe(expectedResult);
  });
});
