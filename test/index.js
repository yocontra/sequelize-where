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
})
