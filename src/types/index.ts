import ArrayValidator from '@/ArrayValidator'
import BooleanValidator from '@/BooleanValidator'
import NumberValidator from '@/NumberValidator'
import ObjectValidator from '@/ObjectValidator'
import StringValidator from '@/StringValidator'
import UnTypedValidator from '@/UntypedValidator'

export interface IValidator {
  result: () => boolean,
  errText: (text: string) => void,
  error: () => Error,
}

// export type UtilFunction = (value: any, option?: any) => boolean

export type ValidateFunction = (value: any, option?: any) => boolean
export type UtilFunction = (option?: any) => ValidateFunction


export interface IUtils {
  number: UtilFunction,
  boolean: UtilFunction,
  string: UtilFunction,
  object: UtilFunction,
  array: UtilFunction,

  // any
  oneof: UtilFunction,

  // number
  min: UtilFunction,
  max: UtilFunction,
  int: UtilFunction,
  positive: UtilFunction,
  negative: UtilFunction,
  id: UtilFunction,
  toFixed: UtilFunction,

  // string
  minLength: UtilFunction,
  maxLength: UtilFunction,
  numeric: UtilFunction,
  booleanStr: UtilFunction,
  useRE: UtilFunction,
  email: UtilFunction,
  phone: UtilFunction,
  date: UtilFunction,
}

export type AllValidator =
  UnTypedValidator |
  NumberValidator |
  StringValidator |
  ObjectValidator |
  BooleanValidator |
  ArrayValidator

export interface IUnTypedValidator {

}
