# sequelize-where [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Simple query language for filtering objects. Pure JS implementation of the `where` part of queries from Sequelize.

## Install

```
npm install sequelize-where --save
```

## Usage

```js
import filter from 'sequelize-where'

// filter takes a query object and returns a function
// the filter function returned takes one object argument - the input data
const fn = filter({
  $or: [
    { a: 'c' },
    { a: 'd' },
    { b: { $in: [ 'd', 'e', 'f' ] } }
  ]
})

console.log(fn({ a: 'c' })) // true
console.log(fn({ a: 'd' })) // true
console.log(fn({ a: 'f' })) // false
console.log(fn({ a: 'f', b: 'e' })) // true
```

[downloads-image]: http://img.shields.io/npm/dm/sequelize-where.svg
[npm-url]: https://npmjs.org/package/sequelize-where
[npm-image]: http://img.shields.io/npm/v/sequelize-where.svg

[travis-url]: https://travis-ci.org/contra/sequelize-where
[travis-image]: https://travis-ci.org/contra/sequelize-where.png?branch=master
