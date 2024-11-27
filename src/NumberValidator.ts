import AllValidator from './AllValidator';
import { ValidateFunction } from './types';
import Utils, { isEmptyValue } from './Utils';

/**
 * Validator for Number parameters, which includes multiple Number validation methods.
 */
class NumberValidator<O extends boolean = false> extends AllValidator<number, O, false> {
  override output: number;

  #validationTasks: ValidateFunction[] = [];
  #optional = false;
  #nullable = false;

  constructor() {
    super();
    this.output = 0;
    this.#addValidation(Utils.number());
  }

  #addValidation(fn: ValidateFunction) {
    this.#validationTasks.push(fn);
  }

  optional() {
    this.#optional = true;
    return this as NumberValidator< true>;
  }

  nullable() {
    this.#nullable = true
    return this as NumberValidator<O>
  }

  /**
   * Set minimum value of a number.
   * Returns true if number >= min.
   * @param {number} min minimum value
   * @returns {NumberValidator} NumberValidator
   */
  min(min: number) {
    this.#addValidation(Utils.min(min));
    return this;
  }

  /**
   * Set maximum value of a number.
   * Returns true if number <= max.
   * @param {number} max maximum value
   * @returns {NumberValidator} NumberValidator
   */
  max(max: number) {
    this.#addValidation(Utils.max(max));
    return this;
  }

  /**
   * Check if a number is an integer.
   * Returns true if number is an integer.
   * @returns {NumberValidator} NumberValidator
   */
  int() {
    this.#addValidation(Utils.int());
    return this;
  }

  /**
   * Check if number is positive.
   * Returns true if number >= 0.
   * @returns {NumberValidator} NumberValidator
   */
  positive() {
    this.#addValidation(Utils.positive());
    return this;
  }

  /**
   * Check if number is negative.
   * Returns true if number <= 0.
   * @returns {NumberValidator} NumberValidator
   */
  negative() {
    this.#addValidation(Utils.negative());
    return this;
  }

  /**
   * Check if number is a positive integer.
   * Returns true if the number is a positive integer.
   * @returns {NumberValidator} NumberValidator
   */
  id() {
    this.#addValidation(Utils.id());
    return this;
  }

  /**
   * Set fixed length of a float number.
   * Returns true if the fixed length equals.
   * @param {number} len fixed length
   * @returns {NumberValidator} NumberValidator
   */
  toFixed(len: number) {
    this.#addValidation(Utils.toFixed(len));
    return this;
  }

  /**
   * Check if number is one of the array elements.
   * Returns true if the number is in the array.
   * @param {number[]} arr number set
   * @returns {NumberValidator} NumberValidator
   */
  oneof(arr: number[]) {
    this.#addValidation(Utils.oneof(arr));
    return this;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }
    if (Number.isNaN(p) && !this.#nullable) {
      return false
    }

    for (const fn of this.#validationTasks) {
      if (!fn(p)) return false;
    }

    return true;
  }
}

export default NumberValidator;