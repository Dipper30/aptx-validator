import { AllValidator, ValidateFunction } from './types'
import Utils, { isEmptyValue } from './Utils'

/**
 * Validator for Number parameters, which includes multiple Number validation methods.
 */
class NumberValidator {

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
    this.#pushTask(Utils.number())
  }

  #pushTask (fn: ValidateFunction) {
    this.#validationTasks.push(fn)
  }

  min (v: number) {
    this.#pushTask(Utils.min(v))
    return this
  }

  max (v: number) {
    this.#pushTask(Utils.max(v))
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
   * @returns {NumberValidator} NumberValidator
   */
  validate (fn: ValidateFunction) {
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
   * @returns {NumberValidator} NumberValidator
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

export default NumberValidator