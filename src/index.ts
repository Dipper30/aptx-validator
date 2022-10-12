import 'module-alias'
import Validator from './UntypedValidator'
import Utils from './Utils'

const override = Utils.resetFunction.bind(Utils)

export {
  Validator,
  override,
}