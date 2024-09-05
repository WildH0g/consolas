import { ConsolAS } from '../src/server/server.js';
const cx = new ConsolAS();

describe('Consoled object must not mutate', () => {
  it('Two-dimensional array', () => {
    const data = [
      ['Name', 'Profession'],
      ['John Doe', 'Developer'],
      ['Jane Doe', 'Designer'],
      ['Jim Doe', 'Artist'],
    ];
    const dataClone = JSON.parse(JSON.stringify(data));
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    expect(data).toEqual(dataClone);
  });
  it('Object', () => {
    const data = {
      name: 'John Doe',
      profession: 'Developer',
      age: 30,
      city: 'Anytown',
    };
    const dataClone = JSON.parse(JSON.stringify(data));
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    expect(data).toEqual(dataClone);
  });
  it('Object array', () => {
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
    const dataClone = JSON.parse(JSON.stringify(data));
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    cx.table(data, { returnOnly: true });
    expect(data).toEqual(dataClone);
  });
});
