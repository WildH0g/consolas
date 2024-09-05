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

const nestedObjWithArrays = {
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
};

const objectArray = [
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

const nestedObjectsArray = [
  {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "hiking", "swimming"],
    address: {
      street: "123 Maple Street",
      city: "Springfield"
    }
  },
  {
    name: "Bob",
    age: 25,
    hobbies: ["cycling", "painting", "travelling"],
    address: {
      street: "456 Oak Avenue",
      city: "Rivertown"
    }
  },
  {
    name: "Charlie",
    age: 35,
    hobbies: ["running", "gaming", "cooking"],
    address: {
      street: "789 Pine Road",
      city: "Lakeside"
    }
  },
  {
    name: "Diana",
    age: 28,
    hobbies: ["yoga", "photography", "gardening"],
    address: {
      street: "101 Birch Boulevard",
      city: "Mountainview"
    }
  }
];

const mockDataVaried = [
  {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "hiking", "swimming"],
    address: {
      street: "123 Maple Street",
      city: "Springfield"
    }
  },
  {
    name: "Bob",
    age: 25,
    jobTitle: "Engineer",
    isEmployed: true
  },
  {
    name: "Charlie",
    hobbies: ["running", "gaming", "cooking"],
    birthYear: 1989,
    address: {
      street: "789 Pine Road",
      city: "Lakeside",
      zipCode: "12345"
    }
  },
  {
    name: "Diana",
    age: 28,
    maritalStatus: "single",
    children: []
  }
];


cx.table(objectArray);
// cx.table(nestedObj);

// cx.tree();
