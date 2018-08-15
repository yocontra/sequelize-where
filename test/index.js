/*eslint no-console: 0*/

import should from 'should'
import createFilter from '../src'

describe('transform', () => {
  it('should work on a empty object', () => {
    const where = {}
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(true)
  })
  it('should work on flat check', () => {
    const where = { a: 'b' }
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(true)
    should(fn({ a: 'c' })).equal(false)
  })
  it('should work on flat $or', () => {
    const where = {
      $or: [
        { a: 'b' },
        { a: 'c' }
      ]
    }
    const fn = createFilter(where)
    should(fn({ a: 'c' })).equal(true)
    should(fn({ a: 'd' })).equal(false)
  })
  it('should work on flat $and', () => {
    const where = {
      $and: [
        { a: 'b' },
        { a: 'c' }
      ]
    }
    const fn = createFilter(where)
    should(fn({ a: 'c' })).equal(false)
    should(fn({ a: 'd' })).equal(false)
  })
  it('should work on flat array', () => {
    const where = [
      { a: 'b' },
      { a: 'c' }
    ]
    const fn = createFilter(where)
    should(fn({ a: 'c' })).equal(false)
    should(fn({ a: 'd' })).equal(false)
  })
  it('should work on array with $or', () => {
    const where = [
      { $or: [ { a: 'b' }, { a: 'c' } ] },
      { a: 'c' }
    ]
    const fn = createFilter(where)
    should(fn({ a: 'c' })).equal(true)
    should(fn({ a: 'd' })).equal(false)
  })
  it('should work on array with $not', () => {
    const where = [
      { $or: [ { a: 'b' }, { a: 'c' } ] },
      { $not: { a: 'c' } }
    ]
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(true)
    should(fn({ a: 'c' })).equal(false)
  })
  it('should work on $in', () => {
    const where = { a: { $in: [ 'b', 'd' ] } }
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(true)
    should(fn({ a: 'c' })).equal(false)
    should(fn({ a: 'd' })).equal(true)
  })
  it('should work on $regexp', () => {
    const where = { a: { $regexp: '.' } }
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(true)
    should(fn({ a: 'c' })).equal(true)
    should(fn({ a: 'd' })).equal(true)
  })
  it('should work on $notRegexp', () => {
    const where = { a: { $notRegexp: '.' } }
    const fn = createFilter(where)
    should(fn({ a: 'b' })).equal(false)
    should(fn({ a: 'c' })).equal(false)
    should(fn({ a: 'd' })).equal(false)
  })
  it('should work on $like', () => {
    const where = { a: { $like: '123%' } }
    const fn = createFilter(where)
    should(fn({ a: '12345' })).equal(true)
    should(fn({ a: '5678' })).equal(false)
    should(fn({ a: '2345' })).equal(false)
  })
  it('should work on $like with case sensitivity', () => {
    const where = { a: { $like: '%a%' } }
    const fn = createFilter(where)
    should(fn({ a: 'bAc' })).equal(false)
    should(fn({ a: 'bac' })).equal(true)
    should(fn({ a: 'abc' })).equal(true)
    should(fn({ a: 'cba' })).equal(true)
  })
  it('should work on $notLike', () => {
    const where = { a: { $notLike: '123%' } }
    const fn = createFilter(where)
    should(fn({ a: '12345' })).equal(false)
    should(fn({ a: '5678' })).equal(true)
    should(fn({ a: '2345' })).equal(true)
  })
  it('should work on $and with one item', () => {
    const where = { $and: [ { name: { $eq: 'abcd' } } ] }
    const fn = createFilter(where)
    should(fn({ name: 'abcd' })).equal(true)
    should(fn({ name: 'ABCDEF' })).equal(false)
    should(fn({ name: '2345' })).equal(false)
  })
  it('should not error on null $and item', () => {
    const where = { $and: [ null ] }
    const fn = createFilter(where)
    should(fn({ name: 'abcd' })).equal(true)
    should(fn({ name: 'ABCDEF' })).equal(true)
    should(fn({ name: '2345' })).equal(true)
  })
  it('should not error on null query', () => {
    const where = null
    const fn = createFilter(where)
    should(fn({ name: 'abcd' })).equal(true)
    should(fn({ name: 'ABCDEF' })).equal(true)
    should(fn({ name: '2345' })).equal(true)
  })
  it('should not error on null $and', () => {
    const where = { $and: null }
    const fn = createFilter(where)
    should(fn({ name: 'abcd' })).equal(false)
    should(fn({ name: 'ABCDEF' })).equal(false)
    should(fn({ name: '2345' })).equal(false)
  })
})
