<h1 align="center">Welcome to ConsolAS - the library with the missing `console` methods for Google Apps Script 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Adds useful Console methods to Google Apps Script

## Getting Started

`ConsolAS` can be used as a native Apps Script library, as an NPM module or simply copied and pasted into your code.

### As a Native Google Apps Script Library

Import the following script ID as a library into your Google Apps Script project:

```text
18Wk4wG7DGRGvy39zZbWhkU37z6ytqW06QkSwUlZHlIClQXHmCtEFucvD
```

Initiate `ConsoleAS`:

```js
const cx = ConsolAS.init();
```

### As an NPM module

Install by running:

```sh
npm i @wildhog/consolas
```

Import and initiate `ConsolAS`:

```js
import { ConsolAS } from '@wildhog/consolas';
const cx = new ConsolAS();
```

### By Copying and Pasting the Code from the `dist/copy-paste/consolas.js` File

The IIFE in the `dist/copy-paste/consolas.js` returns a class and stores it in the `ConsolAS` variable. Hence you only need to initiate the said class:

```js
const cx = new ConsolAS();
```

### API

`ConsolAS` works with two-dimensional arrays and objects.

**Example 1:**

```js
cx.table([
  ['Name', 'Profession'],
  ['John Doe', 'Developer'],
  ['Jane Doe', 'Designer'],
  ['Jim Doe', 'Artist'],
]);
```

This prints out:

```text
| (index) | 0        | 1          |
| ------- | -------- | ---------- |
| 0       | Name     | Profession |
| 1       | John Doe | Developer  |
| 2       | Jane Doe | Designer   |
| 3       | Jim Doe  | Artist     |
```

**Example 2:**

```js
cx.table({
  name: 'John Doe',
  profession: 'Developer',
  age: 30,
  city: 'Anytown',
});
```

This prints out:

```text
| (index)    | Value     |
| ---------- | --------- |
| name       | John Doe  |
| profession | Developer |
| age        | 30        |
| city       | Anytown   |
```

```js
cx.table([
  {
    name: 'Diana',
    age: 28,
  },
]);
```

This prints out:

```text
| (index) | name    | age |
| ------- | ------- | --- |
| 0       | Diana   | 28  |
```

**Example 4:**

```js
cx.assert(1 === 1, '1 is not equal to 1');
```

This prints out nothing if the assertion passes.

```js
cx.assert(1 === 2, '1 is not equal to %i', 2);
```

This prints out:

```text
Assertion failed: 1 is not equal to 2
```

## Supported Methods

Currently, the `table(TwoDimArray|Object)` and `assert(condition, message, ...args)` methods are supported. Other methods will follow soon. Check [CONTRIBUTING](CONTRIBUTING.md) if you are interested in implementing them.

## Run tests

```sh
npm t
```

## See Also

- [CONTRIBUTING](CONTRIBUTING.md)
- [CODE OF CONDUCT](CODE_OF_CONDUCT.md)

## Author

- 👤 **Dmitry Kostyuk**
- [Wurkspaces.dev](https://wurkspaces.dev)
- [LinkedIn](<[linkedin.com](https://www.linkedin.com/in/dmitrykostyuk/)>)
- [Medium](https://blog.wurkspaces.dev)
- [Stack Overflow](https://stackoverflow.com/users/13229211/dmitry-kostyuk)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
