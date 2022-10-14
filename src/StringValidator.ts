import { AllValidator, ValidateFunction } from './types'
import Utils, { isEmptyValue } from './Utils'

/**
 * Validator for String parameters, which includes multiple String validation methods.
 */
class StringValidator {

  #param: any
  #isValid: boolean = true
  #errText: string = 'validation error'
  #require: boolean = false
  #validationTasks: ValidateFunction[] = []
  #validators: AllValidator[] = []

  constructor (p: any, tasks: ValidateFunction[], require: boolean, errText: string) {
    this.#param = p
    this.#validationTasks = tasks
    this.#require = require
    this.#errText = errText
    this.#pushTask(Utils.string())
  }

  #pushTask (fn: ValidateFunction) {
    this.#validationTasks.push(fn)
  }

  /**
   * Set minimum length of a string.
   * Returns true if string length >= min.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} min minimum length
   * @returns {StringValidator} StringValidator
   */
  minLength (min: number) {
    this.#pushTask(Utils.minLength(min))
    return this
  }

  /**
   * Set maximum length of a string.
   * Returns true if string length <= max.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} max maximum length
   * @returns {StringValidator} StringValidator
   */
  maxLength (max: number) {
    this.#pushTask(Utils.maxLength(max))
    return this
  }

  /**
   * Check if string is numeric.
   * Returns true if string is numeric.
   * This method will be tested when StringValidator.result() is called.
   * @returns {StringValidator} StringValidator
   */
  numeric () {
    this.#pushTask(Utils.numeric())
    return this
  }

  /**
   * Set fixed length of a numeric string.
   * Returns true if the fixed length equals.
   * This method will be tested when StringValidator.result() is called.
   * @param {number} len fixed length
   * @returns {StringValidator} StringValidator
   */
  toFixed (len: number) {
    this.#pushTask(Utils.toFixed(len))
    return this
  }

  /**
   * Use customized Regular Expression.
   * Returns true if the Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {RegExp} re self defined Regular Expression
   * @returns {StringValidator} StringValidator
   */
  useRE (re: RegExp) {
    this.#pushTask(Utils.useRE(re))
    return this
  }

  /**
   * Check if string is an email.
   * Returns true if the (default) Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {?RegExp} emailRE self defined email-checking Regular Expression
   * @returns {StringValidator} StringValidator
   */
  email (emailRE?: RegExp) {
    this.#pushTask(Utils.email(emailRE))
    return this
  }

  /**
   * Check if string is a phone number.
   * Returns true if the (default) Regular Expression matches.
   * This method will be tested when StringValidator.result() is called.
   * @param {?RegExp} phoneRE self defined phone-checking Regular Expression
   * @returns {StringValidator} StringValidator
   */
  phone (phoneRE?: RegExp) {
    this.#pushTask(Utils.phone(phoneRE))
    return this
  }

  /**
   * Check if string is a boolean string.
   * Returns true if string === 'true'.
   * This method will be tested when StringValidator.result() is called.
   * @returns {StringValidator} StringValidator
   */
  booleanStr () {
    this.#pushTask(Utils.booleanStr())
    return this
  }

  /**
   * Check if string is one of the array elements.
   * Returns true if the string is in the array.
   * This method will be tested when StringValidator.result() is called.
   * @param {string[]} arr string set
   * @returns {StringValidator} StringValidator
   */
  oneof (arr: string[]) {
    this.#pushTask(Utils.oneof(arr))
    return this
  }

  /**
   * Use a customized validator.
   * @param {AllValidator} validator 
   */
  use (validator: AllValidator) {
    this.#validators.push(validator)
    return this
  }

  /**
   * Add a customized validation method to task list and return itself.
   * @param {ValidateFunction} fn
   * @returns {StringValidator} StringValidator
   */
  custom (fn: ValidateFunction) {
    this.#pushTask(fn)
    return this
  }

  /**
   * Set parameter of the validator.
   * @param {any} param
   */
  setParam (param: any) {
    this.#param = param
  }

  /**
   * Run validation by executing each validation method and return a boolean value.
   * 1. if the param is an empty value (null | undefined | NaN)
   *    a. if value is required, returns false
   *    b. if value is not required, returns true
   * 2. if the param is not an empty value, call every validation method
   * @returns {boolean} true if all validations pass, false otherwise
   */
  result () {
    this.#isValid = true
    if (isEmptyValue(this.#param)) {
      this.#isValid = !this.#require
      return this.#isValid
    }

    for (const fn of this.#validationTasks) {
      if (!this.#isValid) break
      this.#isValid = fn(this.#param)
    }

    for (const validator of this.#validators) {
      if (!this.#isValid) break
      validator.setParam(this.#param)
      this.#isValid = validator.result()
    }

    return this.#isValid
  }

  /**
   * Set error text and return itself.
   * @param {string} errorText
   * @returns {StringValidator} StringValidator
   */
  errText (errorText: string) {
    this.#errText = errorText
    return this
  }

  /**
   * Get error text.
   * @returns {string} error text
   */
  getErrText () {
    return this.#errText
  }

  /**
   * Get an Error with customized error text, you can call this method when the result is false and retieve the errors.
   * @returns {Error} an error with error text
   */
  error () {
    return new Error(this.#errText)
  }

}

export default StringValidator