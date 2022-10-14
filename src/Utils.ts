import { IUtils, UtilFunction, ValidateFunction } from './types'

class Utils implements IUtils {

  number () {
    return (v: any) => Object.prototype.toString.call(v) === '[object Number]'
  }

  boolean () {
    return (v: any) => Object.prototype.toString.call(v) === '[object Boolean]'
  }

  string () {
    return (v: any) => Object.prototype.toString.call(v) === '[object String]'
  }

  array () {
    return (v: any) => Object.prototype.toString.call(v) === '[object Array]'
  }

  object () {
    return (v: any) => Object.prototype.toString.call(v) === '[object Object]'
  }

  bigInt () {
    return (v: any) => Object.prototype.toString.call(v) === '[object BigInt]'
  }

  min (min: number) {
    return (v: number) => v >= min
  }

  max (max: number) {
    return (v: number) => v <= max
  }

  minLength (min: number) {
    return (v: string | typeof Array) => v.length >= min
  }

  maxLength (max: number) {
    return (v: string | typeof Array) => v.length <= max
  }

  resetFunction (name: keyof Utils, fn: UtilFunction) {
    if (name != 'resetFunction' && this[name]) {
      this[name] = fn
    }
  }

}

/**
* @param {*} v 
* @returns {boolean} true if the value is undefined or null or NaN
*/
export const isEmptyValue = (v: any) =>
  v === null ||
  v === undefined ||
  (typeof v === 'number' && isNaN(v))

export default new Utils()

export const DEFAULT_ERROR_TEXT = 'validation error'