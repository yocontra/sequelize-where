'use strict';

exports.__esModule = true;

var _dotProp = require('dot-prop');

var _dotProp2 = _interopRequireDefault(_dotProp);

var _lodash = require('lodash.intersection');

var _lodash2 = _interopRequireDefault(_lodash);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const operators = {
  $eq: queryValue => inputValue => queryValue === inputValue,
  $ne: queryValue => inputValue => queryValue !== inputValue,
  $gte: queryValue => inputValue => inputValue >= queryValue,
  $gt: queryValue => inputValue => inputValue > queryValue,
  $lte: queryValue => inputValue => inputValue <= queryValue,
  $lt: queryValue => inputValue => inputValue < queryValue,
  $not: queryValue => {
    const fn = createFilter(queryValue);
    return v => !fn(v);
  },
  $in: queryValue => inputValue => queryValue.indexOf(inputValue) !== -1,
  $notIn: queryValue => inputValue => queryValue.indexOf(inputValue) === -1,
  /*
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  */
  $and: queryValue => {
    const fns = queryValue.map(q => createFilter(q));
    return v => fns.every(fn => fn(v));
  },
  $or: queryValue => {
    const fns = queryValue.map(q => createFilter(q));
    return v => fns.some(fn => fn(v));
  } /*,
    $any: Op.any,
    $all: Op.all,
    $col: Op.col*/
};

const opKeys = Object.keys(operators);
const hasOps = o => (0, _isPlainObject2.default)(o) && (0, _lodash2.default)(Object.keys(o), opKeys).length !== 0;

const noop = () => true;
const createFilter = (where = {}) => {
  if (!where) return noop;
  if (typeof where === 'function') return where; // nothing to do
  if (Array.isArray(where)) return operators.$and(where);
  const keys = Object.keys(where);
  if (keys.length === 0) return noop; // short out
  const fns = keys.reduce((prev, k) => {
    const val = where[k];
    const opFn = operators[k];

    // let the operator handle it from here
    if (opFn) {
      prev.push(opFn(val));
      return prev;
    }

    // its a comparison
    if (!hasOps(val)) {
      // its a comparison
      prev.push(o => {
        const v = _dotProp2.default.get(o, k);
        return operators.$eq(val)(v);
      });
      return prev;
    }

    // nested operators
    const fn = createFilter(val);
    prev.push(o => {
      const v = _dotProp2.default.get(o, k);
      return fn(v);
    });
    return prev;
  }, []);
  return operators.$and(fns);
};

exports.default = createFilter;
module.exports = exports['default'];