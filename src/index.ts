import 'module-alias'
import Validator from './UntypedValidator'
import { AllValidator, ArrayValidator, BooleanValidator, NumberValidator, ObjectValidator, StringValidator, UnTypedValidator } from './types'
import Utils from './Utils'

const override = Utils.resetFunction.bind(Utils)

/**
 * a factory function which creates a new Validator
 * @param {any} data optional
 * @returns a new Validator
 */
const validate = (data?: any) => new Validator(data)

export {
  Validator,
  validate,
  override,
}

export type {
  AllValidator,
  UnTypedValidator,
  NumberValidator,
  StringValidator,
  ObjectValidator,
  BooleanValidator,
  ArrayValidator,
}