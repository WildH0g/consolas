import { ConsoleX } from '../src/app.js';
const cx = new ConsoleX().polyfill();

const twoDim = [
  ['Name', 'Profession'],
  ['John Doe', 'Developer'],
  ['Jane Doe', 'Designer'],
  ['Jim Doe', 'Artist'],
];

const shortStr = 'Bla bla bla';

const longStr = 'This is not an array, strings are not allowed in this function';

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
]

cx.table(twoDimWithObj);
