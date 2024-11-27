import AllValidator from './AllValidator';
import {  ValidateFunction } from './types';
import Utils, { isEmptyValue } from './Utils';

/**
 * Validator for Boolean parameters, which includes multiple Boolean validation methods.
 */
class BooleanValidator<O extends boolean = false> extends AllValidator<boolean, O ,false> {
  override output: boolean;

  #validationTasks: ValidateFunction[] = [];
  #optional = false;
  constructor() {
    super();
    this.output = false;
    this.#addValidation(Utils.boolean());
  }

  #addValidation(fn: ValidateFunction) {
    this.#validationTasks.push(fn);
  }

  optional() {
    this.#optional = true;
    return this as BooleanValidator<true>;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }

    for (const fn of this.#validationTasks) {
      if (!fn(p)) return false;
    }

    return true;
  }
}

export default BooleanValidator;