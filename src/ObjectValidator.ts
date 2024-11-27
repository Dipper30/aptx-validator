import AllValidator from './AllValidator';
import { ARecord, ValidateFunction } from './types';
import Utils, { isEmptyValue } from './Utils';

/**
 * Validator for Boolean parameters, which includes multiple Boolean validation methods.
 */
class ObjectValidator<T extends ARecord = any, O extends boolean = false, N extends boolean = false> extends AllValidator<T, O, N> {
  #validationTasks: ValidateFunction[] = [];
  #optional = false;
  #rules?: T;
  override output: T;

  constructor(v?: T) {
    super();
    this.output = v || {} as T;
    this.#rules = v;
    this.isOptional = false as O;
    this.#addValidation(Utils.object());
  }

  #addValidation(fn: ValidateFunction) {
    this.#validationTasks.push(fn);
  }

  optional() {
    this.#optional = true;
    return this as ObjectValidator<T,true, N>;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }

    for (const fn of this.#validationTasks) {
      if (!fn(p)) return false;
    }

    if (this.#rules) {
      for (const name in this.#rules) {
        const validator = this.#rules[name];
        if (!validator.test(p[name])) {
          this.errText(validator.getErrText());
          return false;
        }
      }
    }

    return true;
  }
}

export default ObjectValidator;