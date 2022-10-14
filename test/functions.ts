import { override, Validator } from '../src/index'
import { AllValidator } from '@/types'
import assert from 'assert'

const runTests = () => {
  try {
    console.log('==========')
    // Number Function Checks
    let r: AllValidator
    let v: any

    // min
    v = 1
    r = new Validator(v).required().number().min(1)
    assert.ok(r.result(), 'test min fails')

    v = 1
    r = new Validator(v).required().number().min(2).errText('min 2')
    assert.deepStrictEqual(r.result(), false, 'test min fails')
    assert.deepStrictEqual(r.getErrText(), 'min 2', 'test min fails')

    // max
    v = 1
    r = new Validator(v).required().number().max(1)
    assert.ok(r.result(), 'test max fails')

    v = 3
    r = new Validator(v).required().number().max(2).errText('max 2')
    assert.deepStrictEqual(r.result(), false, 'test max fails')
    assert.deepStrictEqual(r.getErrText(), 'max 2', 'test max fails')

    // integer
    v = 11
    r = new Validator(v).required().number().int()
    assert.ok(r.result(), 'test int fails')

    v = 3.1
    r = new Validator(v).required().number().int().errText('not int')
    assert.deepStrictEqual(r.result(), false, 'test int fails')
    assert.deepStrictEqual(r.getErrText(), 'not int', 'test int fails')

    // positive
    v = 11
    r = new Validator(v).required().number().positive()
    assert.ok(r.result(), 'test positive fails')

    v = -3
    r = new Validator(v).required().number().positive().errText('not positive')
    assert.deepStrictEqual(r.result(), false, 'test positive fails')
    assert.deepStrictEqual(r.getErrText(), 'not positive', 'test positive fails')

    // negative
    v = -1
    r = new Validator(v).required().number().negative()
    assert.ok(r.result(), 'test positive fails')

    v = 3
    r = new Validator(v).required().number().negative().errText('not negative')
    assert.deepStrictEqual(r.result(), false, 'test negative fails')
    assert.deepStrictEqual(r.getErrText(), 'not negative', 'test negative fails')

    // id
    v = 11
    r = new Validator(v).required().number().id()
    assert.ok(r.result(), 'test id fails')

    v = 3.1
    r = new Validator(v).required().number().id().errText('not id')
    assert.deepStrictEqual(r.result(), false, 'test id fails')
    assert.deepStrictEqual(r.getErrText(), 'not id', 'test id fails')

    v = 0
    r = new Validator(v).required().number().id().errText('not id')
    assert.deepStrictEqual(r.result(), false, 'test id fails')
    assert.deepStrictEqual(r.getErrText(), 'not id', 'test id fails')

    // toFixed
    v = 11.1
    r = new Validator(v).required().number().toFixed(1)
    assert.ok(r.result(), 'test toFixed fails')

    v = 1.2
    r = new Validator(v).required().number().toFixed(2).errText('not fixed 2')
    assert.deepStrictEqual(r.result(), false, 'test toFixed fails')
    assert.deepStrictEqual(r.getErrText(), 'not fixed 2', 'test toFixed fails')
    

    
    console.log('\x1B[32m%s\x1B[0m', 'Number function tests passed!')
    console.log('==========')

    console.log('==========')
    // String Function Checks

    // minLength
    v = 'test'
    r = new Validator(v).required().string().minLength(2)
    assert.ok(r.result(), 'test minLength fails')

    v = 't'
    r = new Validator(v).required().string().minLength(2).errText('minLength 2')
    assert.deepStrictEqual(r.result(), false, 'test minLength fails')
    assert.deepStrictEqual(r.getErrText(), 'minLength 2', 'test minLength fails')

    // maxLength
    v = 'test'
    r = new Validator(v).required().string().maxLength(4)
    assert.ok(r.result(), 'test minLength fails')

    v = 'test'
    r = new Validator(v).required().string().maxLength(2).errText('maxLength 2')
    assert.deepStrictEqual(r.result(), false, 'test maxLength fails')
    assert.deepStrictEqual(r.getErrText(), 'maxLength 2', 'test maxLength fails')

    // numeric
    v = '123'
    r = new Validator(v).required().string().numeric()
    assert.ok(r.result(), 'test numeric fails')

    v = 'test123'
    r = new Validator(v).required().string().numeric().errText('not numeric')
    assert.deepStrictEqual(r.result(), false, 'test numeric fails')
    assert.deepStrictEqual(r.getErrText(), 'not numeric', 'test numeric fails')

    // toFixed
    v = '1.32'
    r = new Validator(v).required().string().toFixed(2)
    assert.ok(r.result(), 'test minLength fails')

    v = '1.32'
    r = new Validator(v).required().string().toFixed(3).errText('toFixed 3')
    assert.deepStrictEqual(r.result(), false, 'test toFixed fails')
    assert.deepStrictEqual(r.getErrText(), 'toFixed 3', 'test toFixed fails')

    // email
    v = 'ddddipper30@gmail.com'
    r = new Validator(v).required().string().email()
    assert.ok(r.result(), 'test email fails')

    v = 'ddddipper30@.com'
    r = new Validator(v).required().string().email().errText('not email')
    assert.deepStrictEqual(r.result(), false, 'test email fails')
    v = 'ddddipper30@gmail.'
    r = new Validator(v).required().string().email().errText('not email')
    assert.deepStrictEqual(r.result(), false, 'test email fails')
    v = 'ddddipper30@'
    r = new Validator(v).required().string().email().errText('not email')
    assert.deepStrictEqual(r.result(), false, 'test email fails')
    assert.deepStrictEqual(r.getErrText(), 'not email', 'test email fails')

    // phone
    v = '18912264685'
    r = new Validator(v).required().string().phone()
    assert.ok(r.result(), 'test phone fails')

    v = '1891226468'
    r = new Validator(v).required().string().phone().errText('not phone')
    assert.deepStrictEqual(r.result(), false, 'test phone fails')
    v = '32118912264'
    r = new Validator(v).required().string().phone().errText('not phone')
    assert.deepStrictEqual(r.result(), false, 'test phone fails')
    assert.deepStrictEqual(r.getErrText(), 'not phone', 'test phone fails')

    // booleanStr
    v = 'false'
    r = new Validator(v).required().string().booleanStr()
    assert.ok(r.result(), 'test phone fails')

    v = '0'
    r = new Validator(v).required().string().booleanStr().errText('not booleanStr')
    assert.deepStrictEqual(r.result(), false, 'test booleanStr fails')
    assert.deepStrictEqual(r.getErrText(), 'not booleanStr', 'test booleanStr fails')

    // oneof
    v = 'el1'
    r = new Validator(v).required().string().oneof(['el1', 'el2'])
    assert.ok(r.result(), 'test oneof fails')

    v = 'el3'
    r = new Validator(v).required().string().oneof(['el1', 'el2']).errText('not in array')
    assert.deepStrictEqual(r.result(), false, 'test oneof fails')
    assert.deepStrictEqual(r.getErrText(), 'not in array', 'test oneof fails')

    

    console.log('\x1B[32m%s\x1B[0m', 'String function tests passed!')
    console.log('==========')
  } catch (error) {
    console.log(error)
  }
}

export default runTests