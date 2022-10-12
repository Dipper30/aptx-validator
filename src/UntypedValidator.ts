import NumberValidator from './NumberValidator'
import { AllValidator, IUnTypedValidator, UtilFunction, ValidateFunction } from './types'
import StringValidator from './StringValidator'
import BooleanValidator from './BooleanValidator'
import ObjectValidator from './ObjectValidator'
import { isEmptyValue } from './Utils'
import ArrayValidator from './ArrayValidator'

/**
 * A Validator whose type is not defined yet.
 */
class UnTypedValidator implements IUnTypedValidator {

  #param: any
  #isValid: boolean = true
  #errText: string = 'validation error'
  #validationTasks: ValidateFunction[] = []
  #require: boolean = false
  #validators: AllValidator[] = []
  
  constructor (p?: any) {
    this.#param = p
  }

  required () {
    this.#require = true
    return this
  }

  number () {
    return new NumberValidator(this.#param, this.#validationTasks, this.#require, this.#errText)
  }

  string () {
    return new StringValidator(this.#param, this.#validationTasks, this.#require, this.#errText)
  }

  boolean () {
    return new BooleanValidator(this.#param, this.#validationTasks, this.#require, this.#errText)
  }

  array (validator?: AllValidator | 'number' | 'string' | 'boolean') {
    return new ArrayValidator(this.#param, this.#validationTasks, this.#require, this.#errText, validator)
  }

  object () {
    return new ObjectValidator(this.#param, this.#validationTasks, this.#require, this.#errText)
  }

  /**
   * Set parameter of the validator.
   * @param {any} param
   */
  setParam (param: any) {
    this.#param = param
  }

  /**
   * Use a customized validator.
   * @param {AllValidator} validator 
   */
  use (validator: AllValidator) {
    this.#validators.push(validator)
    return this
  }

  result (): boolean {
    this.#isValid = true
    if (isEmptyValue(this.#param)) {
      this.#isValid = !this.#require
      return this.#isValid
    }

    for (const validator of this.#validators) {
      if (!this.#isValid) break
      validator.setParam(this.#param)
      this.#isValid = validator.result()
    }

    return this.#isValid
  }

  errText (v: string) {
    this.#errText = v
    return this
  }

  getErrText () {
    return this.#errText
  }

  error () {
    return new Error(this.#errText)
  }

}

export default UnTypedValidator