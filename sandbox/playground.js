import { ConsolAS } from '../src/app.js';
const cx = new ConsolAS().polyfill();

const twoDim = [
  ['Name', 'Profession'],
  ['John Doe', 'Developer'],
  ['Jane Doe', 'Designer'],
  ['Jim Doe', 'Artist'],
];

const shortStr = 'Bla bla bla';

const longStr =
  'This is not an array, strings are not allowed in this function';

const twoDimWithObj = [
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

const object = {
  name: 'John Doe',
  profession: 'Developer',
  age: 30,
  city: 'Anytown',
};

const nestedObj = {
  name: 'John Doe',
  address: {
    street: {
      name: 'Main Street',
      number: 123,
    },
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
  },
  profession: 'Developer',
};

const nestedObjWithArrays =  {
  name: 'John Doe',
  address: {
    street: {
      number: 23,
      name: 'Main Street',
    },
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    coord: [34.0522, -118.2437],
  },
  profession: 'Developer',
  hobbies: ['reading', 'swimming', 'running'],
  skills: ['JavaScript', 'Alpine', 'Node.js'],
}

cx.table(nestedObjWithArrays);
// cx.table(nestedObj);

// cx.tree();
