import objectArrayToTable from '../src/server/class-methods/table/table-object-array.js';

describe('Array of objects', () => {
  it('Simple objects', () => {
    const data = [
      {
        name: 'Alice',
        age: 30,
      },
      {
        name: 'Bob',
        age: 25,
      },
      {
        name: 'Charlie',
        age: 35,
      },
      {
        name: 'Diana',
        age: 28,
      },
    ];

    const expectedResult = [
      '| (index) | name    | age |',
      '| ------- | ------- | --- |',
      '| 0       | Alice   | 30  |',
      '| 1       | Bob     | 25  |',
      '| 2       | Charlie | 35  |',
      '| 3       | Diana   | 28  |',
    ]
      .join('\n')
      .trim();

    expect(objectArrayToTable(data)).toBe(expectedResult);
  });

  it('Complex object', () => {
    const data = [
      {
        name: 'Alice',
        age: 30,
        hobbies: ['reading', 'hiking', 'swimming'],
        address: {
          street: '123 Maple Street',
          city: 'Springfield',
        },
      },
      {
        name: 'Bob',
        age: 25,
        jobTitle: 'Engineer',
        isEmployed: true,
      },
      {
        name: 'Charlie',
        hobbies: ['running', 'gaming', 'cooking'],
        birthYear: 1989,
        address: {
          street: '789 Pine Road',
          city: 'Lakeside',
          zipCode: '12345',
        },
      },
      {
        name: 'Diana',
        age: 28,
        maritalStatus: 'single',
        children: [],
      },
    ];

    const expectedResult = [
      '| (index) | name    | age | hobbies                  | address                  | jobTitle | isEmployed | birthYear | maritalStatus | children |',
      '| ------- | ------- | --- | ------------------------ | ------------------------ | -------- | ---------- | --------- | ------------- | -------- |',
      '| 0       | Alice   | 30  | ["reading","hiking","... | {"street":"123 Maple ... |          |            |           |               |          |',
      '| 1       | Bob     | 25  |                          |                          | Engineer | true       |           |               |          |',
      '| 2       | Charlie |     | ["running","gaming","... | {"street":"789 Pine R... |          |            | 1989      |               |          |',
      '| 3       | Diana   | 28  |                          |                          |          |            |           | single        | []       |',
    ]
      .join('\n')
      .trim();
      
    expect(objectArrayToTable(data)).toBe(expectedResult);
  });
});
