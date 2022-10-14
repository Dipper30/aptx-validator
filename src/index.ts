import 'module-alias'
import Validator from './UntypedValidator'
import Utils from './Utils'
import { AllValidator } from './types'

const override = Utils.resetFunction.bind(Utils)

export {
  Validator,
  override,
  AllValidator,
}