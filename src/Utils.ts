import { IUtils, UtilFunction } from './types';

class Utils implements IUtils {

  /* General */
  number() {
    return (v: any) => Object.prototype.toString.call(v) === '[object Number]';
  }

  isNaN() {
    return (v: any) => Number.isNaN(v);
  }
  
  boolean() {
    return (v: any) => Object.prototype.toString.call(v) === '[object Boolean]';
  }

  string() {
    return (v: any) => Object.prototype.toString.call(v) === '[object String]';
  }

  array() {
    return (v: any) => Object.prototype.toString.call(v) === '[object Array]';
  }

  object() {
    return (v: any) => Object.prototype.toString.call(v) === '[object Object]';
  }

  bigInt() {
    return (v: any) => Object.prototype.toString.call(v) === '[object BigInt]';
  }

  oneof(arr: any[]) {
    return (v: any) => arr.includes(v);
  }

  /* Number Methods */
  min(min: number) {
    return (v: number) => v >= min;
  }

  max(max: number) {
    return (v: number) => v <= max;
  }

  int() {
    return (v: number) => v % 1 === 0;
  }

  positive() {
    return (v: number) => v > 0;
  }

  negative() {
    return (v: number) => v < 0;
  }

  id() {
    return (v: number) => v > 0 && v % 1 === 0;
  }

  /* String Methods */
  minLength(min: number) {
    return (v: string | typeof Array) => v.length >= min;
  }

  maxLength(max: number) {
    return (v: string | typeof Array) => v.length <= max;
  }

  toFixed(length: number) {
    if (length <= 0 || length % 1 !== 0) {
      throw new Error('Tofixed value should be greater than 0.');
    }
    return (v: number | string) => {
      const n = v.toString();
      const arr = n.split('.');
      if (arr.length <= 1) return false;
      else return arr[1].length === length;
    };
  }

  numeric() {
    return (v: string) => /^\d+$/.test(v);
  }

  useRE(re: RegExp) {
    return (v: string) => re.test(v);
  }

  email(emailRE?: RegExp) {
    return (v: string) =>
      emailRE ?
        emailRE.test(v) :
        /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(v);
  }

  phone(phoneRE?: RegExp) {
    // TODO implement this fuction
    return (v: string) =>
      phoneRE ?
        phoneRE.test(v) :
        /^[1][3,4,5,7,8][0-9]{9}$/.test(v);
  }

  date(datePatterns: string[]) {
    // TODO implement this fuction
    return (v: string) => true;
  }

  booleanStr() {
    return (v: string) => v === 'false' || v === 'true';
  }

  resetFunction(name: keyof Utils, fn: UtilFunction) {
    if (name != 'resetFunction' && this[name]) {
      this[name] = fn as any;
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
  (typeof v === 'number' && isNaN(v));

export default new Utils();

export const DEFAULT_ERROR_TEXT = 'validation error';
