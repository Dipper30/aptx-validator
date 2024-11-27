import AllValidator from './AllValidator';
import { AndParams, OrParams } from './types';
import { isEmptyValue } from './Utils';

export class OrCondition<T extends OrParams = any, O extends boolean = false, N extends boolean = false > extends AllValidator<T, O, N> {
  override output: T;
  #optional = false;
  #validators: T;

  constructor(validators: T) {
    super();
    this.output = validators;
    this.#validators = validators;
  }

  optional() {
    this.#optional = true;
    return this as OrCondition<T, true, N>;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }

    for (const v of this.#validators) {
      if (v.test(p)) return true;
    }

    return false;
  }
}

export class AndCondition< T extends AndParams = any, O extends boolean = false, N extends boolean = false> extends AllValidator<T, O, N> {
  override output: T;
  #optional = false;
  #nullable = false;
  #validators: T;

  constructor(validators: T) {
    super();
    this.output = validators
    this.#validators = validators;
  }

  optional() {
    this.#optional = true;
    return this as AndCondition<T, true, N>;
  }

  nullable() {
    this.#nullable = true;
    return this as AndCondition<T, O, true>;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }

    for (const v of this.#validators) {
      if (!v.test(p)) return false;
    }

    return true;
  }
}

export class ValidationException {
  errMsg: string = ''

  constructor(v: AllValidator) {

  }
}