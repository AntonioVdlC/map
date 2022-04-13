# map

[![version](https://img.shields.io/npm/v/@antoniovdlc/map.svg)](http://npm.im/@antoniovdlc/map)
[![issues](https://img.shields.io/github/issues-raw/antoniovdlc/map.svg)](https://github.com/AntonioVdlC/map/issues)
[![downloads](https://img.shields.io/npm/dt/@antoniovdlc/map.svg)](http://npm.im/@antoniovdlc/map)
[![license](https://img.shields.io/npm/l/@antoniovdlc/map.svg)](http://opensource.org/licenses/MIT)

Custom map functions for arrays.

## Installation

This package is distributed via npm:

```
npm install @antoniovdlc/map
```

## Motivation

Mapping over arrays is a common operation in JavaScript, so this library provides some common custom map functions to have a more declarative way of mapping over arrays.

## Usage

You can use this library either as an ES module or a CommonJS package:
```js
import { select, pick } from "@antoniovdlc/map";
```
*- or -*
```js
const { select, pick } = require("@antoniovdlc/map");
```

## Examples

### select

The `select` map function picks a single value based on a key path in an arry of objects:

```js
import { select } from "@antoniovdlc/map";

const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
];
arr.map(select("age")); // [23, 32, 60, 45]
```

If in some objects, the key path doesn't exist, the returned value for that index will be `null`:
```js
import { select } from "@antoniovdlc/map";

const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Tim" },
  { name: "Candice", age: 45 },
];
arr.map(select("age")); // [23, 32, 60, null, 45]
```

### pick

The `pick` map function is similar to the `select` one, but it allows for picking multiple key paths in an array of objects:
```js
const arr = [
  { name: { first: "Bob", last: "Garcia" }, age: 23 },
  { name: { first: "Alice", last: "Doe" }, age: 32 },
  { name: { first: "Tom", last: "Dupont" }, age: 60 },
  { name: { first: "Candice", last: "Smith" }, age: 45 },
];
arr.map(pick("name.first", "age"));
/*
[
  { name: { first: "Bob" }, age: 23 },
  { name: { first: "Alice" }, age: 32 },
  { name: { first: "Tom" }, age: 60 },
  { name: { first: "Candice" }, age: 45 },
];
*/
```

The `pick` map function always returns an array of objects, even if it is only passed a single key path:
```js
const arr = [
  { name: "Bob", age: 23 },
  { name: "Alice", age: 32 },
  { name: "Tom", age: 60 },
  { name: "Candice", age: 45 },
];
arr.map(pick("age"));
// [{ age: 23 }, { age: 32 }, { age: 60 }, { age: 45 }];
```

Finally, it ignores key paths that don't exist in the objects:
```js
const arr = [
  {
    name: { first: "Bob", last: "Garcia" },
    age: { value: 23, birthday: { year: 1999, month: 3 } },
  },
  {
    name: { first: "Alice", last: "Doe" },
    age: { value: 32, date: { year: 1990, month: 1 } },
  },
  {
    name: { last: "Dupont" },
    age: { value: 60, date: { year: 1962, month: 10 } },
  },
  {
    name: { first: "Candice", last: "Smith" },
    age: { value: 45, birthday: { month: 8 } },
  },
];
arr.map(pick("name.first", "age.birthday.year"));
/*
[
  { name: { first: "Bob" }, age: { birthday: { year: 1999 } } },
  { name: { first: "Alice" } },
  null,
  { name: { first: "Candice" } },
]
*/
```

## License
MIT