import objectToTable from '../src/class-methods/table-object';

describe('Object to MD Table', () => {
  it('Simple object', () => {
    // object with 4 entries
    const data = {
      name: 'John Doe',
      profession: 'Developer',
      age: 30,
      city: 'Anytown',
    };
    const expectedResult = `
| (index)    | Value     |
| ---------- | --------- |
| name       | John Doe  |
| profession | Developer |
| age        | 30        |
| city       | Anytown   |`.trim();
    expect(objectToTable(data)).toBe(expectedResult);
  });

  it('Nested objects', () => {
    const data = {
      name: 'John Doe',
      address: {
        street: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      profession: 'Developer',
    };
    const expectedResult = `
| (index)    | Value     | street          | city    | state | zip   |
| ---------- | --------- | --------------- | ------- | ----- | ----- |
| name       | John Doe  |                 |         |       |       |
| address    |           | 123 Main Street | Anytown | CA    | 12345 |
| profession | Developer |                 |         |       |       |`.trim();

    expect(objectToTable(data)).toBe(expectedResult);    
  });

  it('Nested objects with arrays', () => {
    const data = {
      name: 'John Doe',
      address: {
        street: {
          number: 23,
          name: 'Main St.'
        },
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        coord: [34.0522, -118.2437],
      },
      profession: 'Developer',
      hobbies: ['reading', 'swimming', 'running'],
      skills: ['JavaScript', 'Alpine', 'Node.js']
    };
    
    const expectedResult = `
| (index)    | Value     | street | city    | state | zip   | coord                | 0          | 1        | 2       |
| ---------- | --------- | ------ | ------- | ----- | ----- | -------------------- | ---------- | -------- | ------- |
|            |           |        |         |       |       |                      |            |          |         |
| name       | John Doe  |        |         |       |       |                      |            |          |         |
| address    |           | {…}    | Anytown | CA    | 12345 | [34.0522, -118.2437] |            |          |         |
| profession | Developer |        |         |       |       |                      |            |          |         |
| hobbies    |           |        |         |       |       |                      | reading    | swimming | running |
| skills     |           |        |         |       |       |                      | JavaScript | Alpine   | Node.js |
    `.trim();
    expect(objectToTable(data)).toBe(expectedResult);
  });
});
