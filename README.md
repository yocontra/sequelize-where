# sequelize-where [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]


## Install

```
npm install sequelize-where --save
```

## Usage

```js
import { transform } from 'sequelize-where'

const transforms = {
  date: (v) => new Date(v)
}

const stack = [
  { to: 'bday', from: 'birth', transforms: [ 'date' ] },
  { to: 'name', from: 'name.legal' }
]

const input = {
  name: {
    legal: 'Don Adams',
    preferred: 'Donny'
  },
  birth: '11/12/27'
}

console.log(transform(stack, input, { transforms }))
/*
Prints:

{
  "bday": "2027-11-12T05:00:00.000Z",
  "name": "Don Adams"
}
*/
```

[downloads-image]: http://img.shields.io/npm/dm/sequelize-where.svg
[npm-url]: https://npmjs.org/package/sequelize-where
[npm-image]: http://img.shields.io/npm/v/sequelize-where.svg

[travis-url]: https://travis-ci.org/contra/sequelize-where
[travis-image]: https://travis-ci.org/contra/sequelize-where.png?branch=master
