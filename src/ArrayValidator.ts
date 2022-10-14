import { Validator } from '.'
import { AllValidator, ValidateFunction } from './types'
import Utils, { DEFAULT_ERROR_TEXT, isEmptyValue } from './Utils'
import 'module-alias'

/**
 * Validator for Array parameters, which includes multiple Array validation methods.
 */
class ArrayValidator {

  #param: any
  #isValid: boolean = true
  #errText: string = 'validation error'
  #require: boolean = false
  #validationTasks: ValidateFunction[] = []
  #validators: AllValidator[] = []
  #rule: AllValidator | null = null

  constructor (p: any, tasks: ValidateFunction[], require: boolean, errText: string, validator?: AllValidator | 'number' | 'string' | 'boolean') {
    this.#param = p
    this.#validationTasks = tasks
    this.#require = require
    this.#errText = errText
    let rule: any = null
    if (validator) {
      switch (validator) {
        case 'number':
          rule = new Validator().required().number()
          break
        case 'string':
          rule = new Validator().required().string()
          break
        case 'boolean':
          rule = new Validator().required().boolean()
          break
        default:
          rule = validator as AllValidator
      }
    }
    if (rule) this.#rule = rule
    this.#pushTask(Utils.array())
  }

  #pushTask (fn: ValidateFunction) {
    this.#validationTasks.push(fn)
  }

  minLength (min: number) {
    this.#pushTask(Utils.minLength(min))
    return this
  }

  maxLength (max: number) {
    this.#pushTask(Utils.maxLength(max))
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

    if (this.#isValid && this.#rule && this.#param) {
      // check each item of the input array
      for (const value of this.#param) {
        this.#rule.setParam(value)
        this.#isValid = this.#rule.result()
        if (!this.#isValid) {
          this.#setErrText(this.#rule.getErrText())
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

export default ArrayValidator