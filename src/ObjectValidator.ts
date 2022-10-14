import { AllValidator, ValidateFunction } from './types'
import Utils, { DEFAULT_ERROR_TEXT, isEmptyValue } from './Utils'

/**
 * Validator for Object parameters, which includes multiple Object validation methods.
 */
class ObjectValidator {

  #param: any
  #isValid: boolean = true
  #errText: string = DEFAULT_ERROR_TEXT
  #require: boolean = false
  #validationTasks: ValidateFunction[] = []
  #validators: AllValidator[] = []
  #rules: { [name: string]: AllValidator } | null = null

  constructor (p: any, tasks: ValidateFunction[], require: boolean, errText: string) {
    this.#param = p
    this.#validationTasks = tasks
    this.#require = require
    this.#errText = errText
    this.#pushTask(Utils.object())
  }

  #pushTask (fn: ValidateFunction) {
    this.#validationTasks.push(fn)
  }

  /**
   * Set rules for each attribute in an object.
   * Each rule requires an attribute name as a key and a Validator as value.
   * eg.:
   * const body = { x: 1, y: '2' }
   * const validator = new Validator(body).object().rules({
   *    'x': new Validator().required().number(),
   *    'y': new Validator().required().string(),
   * })
   * const result = validator.result() // true
   * @param {{ [name: string]: AllValidator }} rules 
   * @returns {ObjectValidator} ObjectValidator
   */
  rules (rules: { [name: string]: AllValidator }) {
    this.#rules = rules
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
   * @returns {ObjectValidator} ObjectValidator
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
   * set error text if the input is not default error text
   * @param text 
   */
  #setErrText (text: string) {
    if (text === DEFAULT_ERROR_TEXT || text === '') return
    this.#errText = text
  }

  /**
   * Run validation by executing each validation method and return a boolean value.
   * 1. if the param is an empty value (null | undefined | NaN)
   *    a. if value is required, returns false
   *    b. if value is not required, returns true
   * 2. if the param is not an empty value, call every validation method
   * @returns {boolean} true if all validations pass, false otherwise
   */
  result (): boolean {
    this.#isValid = true
    if (isEmptyValue(this.#param)) {
      this.#isValid = !this.#require
      return this.#isValid
    }

    for (const fn of this.#validationTasks) {
      if (!this.#isValid) break
      this.#isValid = fn(this.#param)
    }

    if (this.#isValid && this.#rules) {
      for (const name in this.#rules) {
        const validator = this.#rules[name]
        validator.setParam(this.#param[name])
        this.#isValid = validator.result()
        if (!this.#isValid) {
          // set error text
          this.#setErrText(validator.getErrText())
          break
        }
      }
    }

    for (const validator of this.#validators) {
      if (!this.#isValid) break
      validator.setParam(this.#param)
      this.#isValid = validator.result()
      if (!this.#isValid) {
        this.#setErrText(validator.getErrText())
        break
      }
    }

    return this.#isValid
  }

  /**
   * Set error text and return itself.
   * @param {string} errorText
   * @returns {ObjectValidator} ObjectValidator
   */
  errText (errorText: string) {
    this.#setErrText(errorText)
    return this
  }

  /**
   * Get error text.
   * @returns {string} error text
   */
  getErrText () {
    const t = this.#isValid ? '' : this.#errText
    return t
  }

  /**
   * Get an Error with customized error text, you can call this method when the result is false and retieve the errors.
   * @returns {Error} an error with error text
   */
  error () {
    return new Error(this.#errText)
  }

}

export default ObjectValidator