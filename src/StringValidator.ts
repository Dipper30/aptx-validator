import AllValidator from './AllValidator';
import { ValidateFunction } from './types';
import Utils, { isEmptyValue } from './Utils';

/**
 * Validator for String parameters, which includes multiple String validation methods.
 */
class StringValidator<O extends boolean = false, N extends boolean = false> extends AllValidator<string, O, N> {
  override output: string;

  #validationTasks: ValidateFunction[] = [];
  #optional = false;
  constructor() {
    super();
    this.output = '';
    this.#addValidation(Utils.string());
  }

  #addValidation(fn: ValidateFunction) {
    this.#validationTasks.push(fn);
  }

  optional() {
    this.#optional = true;
    return this as StringValidator<true>;
  }

  /**
   * Set minimum length of a string.
   * Returns true if string length >= min.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} min minimum length
   * @returns {StringValidator} StringValidator
   */
  minLength(min: number) {
    this.#addValidation(Utils.minLength(min));
    return this;
  }

  /**
   * Set maximum length of a string.
   * Returns true if string length <= max.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} max maximum length
   * @returns {StringValidator} StringValidator
   */
  maxLength(max: number) {
    this.#addValidation(Utils.maxLength(max));
    return this;
  }

  /**
   * Check if string is numeric.
   * Returns true if string is numeric.
   * This method will be tested when StringValidator.result() is called.
   * @returns {StringValidator} StringValidator
   */
  numeric() {
    this.#addValidation(Utils.numeric());
    return this;
  }

  /**
   * Set fixed length of a numeric string.
   * Returns true if the fixed length equals.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} len fixed length
   * @returns {StringValidator} StringValidator
   */
  toFixed(len: number) {
    this.#addValidation(Utils.toFixed(len));
    return this;
  }

  /**
   * Use customized Regular Expression.
   * Returns true if the Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {RegExp} re self defined Regular Expression
   * @returns {StringValidator} StringValidator
   */
  useRE(re: RegExp) {
    this.#addValidation(Utils.useRE(re));
    return this;
  }

  /**
   * Check if string is an email.
   * Returns true if the (default) Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {?RegExp} emailRE self defined email-checking Regular Expression
   * @returns {StringValidator} StringValidator
   */
  email(emailRE?: RegExp) {
    this.#addValidation(Utils.email(emailRE));
    return this;
  }

  /**
   * Check if string is a phone number.
   * Returns true if the (default) Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {?RegExp} phoneRE self defined phone-checking Regular Expression
   * @returns {StringValidator} StringValidator
   */
  phone(phoneRE?: RegExp) {
    this.#addValidation(Utils.phone(phoneRE));
    return this;
  }

  /**
   * Check if string is a boolean string.
   * Returns true if string === 'true'.
   * This method will be tested when StringValidator.result() is called.
   * @returns {StringValidator} StringValidator
   */
  booleanStr() {
    this.#addValidation(Utils.booleanStr());
    return this;
  }

  /**
   * Check if string is one of the array elements.
   * Returns true if the string is in the array.
   * This method will be tested when StringValidator.result() is called.
   * @param {string[]} arr string set
   * @returns {StringValidator} StringValidator
   */
  oneof(arr: string[]) {
    this.#addValidation(Utils.oneof(arr));
    return this;
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

export default StringValidator;