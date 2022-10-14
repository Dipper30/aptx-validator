const assert = require('assert')
import 'module-alias'
import { AllValidator } from '@/types'
import { Validator, override } from '../src/index'

let r: AllValidator
let v: any
let customizedValidator: AllValidator

// General Checks
try {
  console.log('==========')

  v = 1
  r = new Validator(v).required().errText('param required')
  assert.ok(r.result(), 'test general-1 fails')

  v = undefined
  r = new Validator(v).required().errText('param required')
  assert.deepStrictEqual(r.result(), false, 'test general-2 fails')
  assert.deepStrictEqual(r.getErrText(), 'param required', 'test general-3-err-text fails')

  v = 0
  r = new Validator(v).required().errText('param required')
  assert.ok(r.result(), 'test general-3 fails')

  v = 0
  r = new Validator(v).number().errText('number or empty')
  assert.ok(r.result(), 'test general-4 fails')

  v = 2
  r = new Validator(v).required().number().validate((v: any) => v % 2 === 0).errText('validate function: even number')
  assert.ok(r.result(), 'test general-5 fails')

  v = 2
  r = new Validator(v).required().number().validate((v: any) => v % 2 === 1).errText('validate function: odd number')
  assert.deepStrictEqual(r.result(), false, 'test general-6 fails')

  v = true
  r = new Validator(v).required().boolean().errText('require boolean')
  assert.ok(r.result(), 'test general-7 fails')

  v = 3
  customizedValidator = new Validator().number().min(1)
  r = new Validator(v).use(customizedValidator)
  assert.ok(r.result(), 'test general-8 fails')

  v = 1
  customizedValidator = new Validator().number().min(3)
  r = new Validator(v).use(customizedValidator)
  assert.deepStrictEqual(r.result(), false, 'test general-9 fails')

  v = 4
  r = new Validator(v).use(customizedValidator)
  assert.ok(r.result(), 'test general-10 fails')

  v = 4
  r = new Validator(v).number().use(customizedValidator).validate((v: any) => v === 3)
  assert.deepStrictEqual(r.result(), false, 'test general-11 fails')

  v = 4
  r = new Validator(v).number().use(customizedValidator).validate((v: any) => v === 4)
  assert.ok(r.result(), 'test general-12 fails')

  override('min', (min: number) => {
    return (v: any) => v <= min
  })
  v = 3
  r = new Validator(v).number().min(2)
  assert.deepStrictEqual(r.result(), false, 'test general-13 fails')

  override('min', (min: number) => {
    return (v: any) => v >= min
  })
  v = 3
  r = new Validator(v).number().min(2)
  assert.ok(r.result(), 'test general-14 fails')

  console.log('\x1B[32m%s\x1B[0m', 'General tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// Number Checks
try {
  console.log('==========')

  v = 1
  r = new Validator(v).number().min(1).max(2)
  assert.ok(r.result(), 'test number-1 fails')

  v = 1
  r = new Validator(v).number().min(2).max(2).errText('number between 1 and 2')
  assert.deepStrictEqual(r.result(), false, 'test number-2 fails')


  customizedValidator = new Validator().required().number().min(1).max(2).errText('min1 max2')
  v = 3
  r = new Validator(v).number().use(customizedValidator)
  assert.deepStrictEqual(r.result(), false, 'test number-3 fails')
  
  console.log('\x1B[32m%s\x1B[0m', 'Number tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// Boolean Checks
try {
  console.log('==========')

  v = 'false'
  r = new Validator(v).boolean().errText('require boolean')
  assert.deepStrictEqual(r.result(), false, 'test boolean-1 fails')

  v = true
  r = new Validator(v).boolean().errText('require boolean')
  assert.ok(r.result(), 'test boolean-2 fails')

  console.log('\x1B[32m%s\x1B[0m', 'Boolean tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// String Checks
try {
  console.log('==========')

  v = 'string'
  r = new Validator(v).required().string().errText('string required')
  assert.ok(r.result(), 'test string-1 fails')

  v = 1
  r = new Validator(v).string().errText('string or empty')
  assert.deepStrictEqual(r.result(), false, 'test string-2 fails')

  v = 'mystring'
  r = new Validator(v).string().minLength(10).errText('string or empty')
  assert.deepStrictEqual(r.result(), false, 'test string-2 fails')

  console.log('\x1B[32m%s\x1B[0m', 'String tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// Object Checks
try {
  console.log('==========')

  v = 'string'
  r = new Validator(v).required().object().errText('object required')
  assert.deepStrictEqual(r.result(), false, 'test object-1 fails')

  customizedValidator = new Validator().required().string()
  v = { x: 1, y: 'y' }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number(),
    'y': customizedValidator,
  }).errText('object required')
  assert.ok(r.result(), 'test object-2 fails')

  v = { x: 1, y: 'y' }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number().errText('invalid x'),
    'y': new Validator().required().number().errText('invalid y'),
  }).errText('object required')
  assert.deepStrictEqual(r.result(), false, 'test object-3 fails')
  assert.deepStrictEqual(r.getErrText(), 'invalid y', 'test object-3-error-text fails')

  v = null
  r = new Validator(v).object().rules({
    'x': new Validator().required().number(),
    'y': new Validator().required().object().rules({
      'z': new Validator().required().string()
    }),
  }).errText('nested object not required')
  assert.ok(r.result(), 'test object-4 fails')

  v = { x: 1, y: { z: 'nested z' } }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number(),
    'y': new Validator().required().object().rules({
      'z': new Validator().required().string()
    }),
  }).errText('nested object required')
  assert.ok(r.result(), 'test object-5 fails')

  v = { x: 1, y: { z: { n: false } } }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number(),
    'y': new Validator().required().object().rules({
      'z': new Validator().required().object().rules({
        'n': new Validator().required().boolean()
      })
    }),
  }).errText('nested object required')
  assert.ok(r.result(), 'test object-6 fails')

  customizedValidator = new Validator().number().min(1)
  v = { x: 1, y: { z: { nnn: false } } }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number().use(customizedValidator),
    'y': new Validator().required().object().rules({
      'z': new Validator().required().object().rules({
        'n': new Validator().boolean()
      })
    }),
  }).errText('nested object not required')
  assert.ok(r.result(), 'test object-7 fails')

  v = { x: 1, y: { z: { n: '1' } } }
  r = new Validator(v).object().rules({
    'x': new Validator().required().number().use(customizedValidator),
    'y': new Validator().required().object().rules({
      'z': new Validator().required().object().rules({
        'n': new Validator().boolean().errText('invalid n')
      })
    }),
  }).errText('nested object not required')
  assert.deepStrictEqual(r.result(), false, 'test object-8 fails')
  assert.deepStrictEqual(r.getErrText(), 'invalid n', 'test object-8-error-text fails')
  
  console.log('\x1B[32m%s\x1B[0m', 'Object tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// Array Checks
try {
  console.log('==========')

  v = 'string'
  r = new Validator(v).required().array().errText('array required')
  assert.deepStrictEqual(r.result(), false, 'test array-1 fails')

  v = [1, 2]
  r = new Validator(v).array('number').minLength(2).errText('number array required')
  assert.ok(r.result(), 'test array-2 fails')

  v = [1, '2']
  r = new Validator(v).array('number').errText('number array required')
  assert.deepStrictEqual(r.result(), false, 'test array-3 fails')

  customizedValidator = new Validator().object().rules({
    'id': new Validator().number(),
    'name': new Validator().string(),
  })
  v = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
  ]
  r = new Validator(v).array(customizedValidator).errText('array with customized validator')
  assert.ok(r.result(), 'test array-4 fails')

  v = [
    { id: 1, name: 'name1' },
    { id: 2, name: { value: 'name2' } },
  ]
  r = new Validator(v).array(customizedValidator).errText('array with customized validator')
  assert.deepStrictEqual(r.result(), false, 'test array-5 fails')

  customizedValidator = new Validator().object().rules({
    'id': new Validator().number(),
    'name': new Validator().object().rules({
      'value': new Validator().string().validate((str: string) => str.length >= 5).errText('name value not valid'),
    }).errText('name not valid'),
  })
  v = [
    { id: 1, name: 'name1' },
    { id: 2, name: { value: 'name2' } },
  ]
  r = new Validator(v).array(customizedValidator).errText('array with customized validator')
  assert.deepStrictEqual(r.result(), false, 'test array-6 fails')
  assert.deepStrictEqual(r.getErrText(), 'name not valid', 'test array-6-error-text fails')

  customizedValidator = new Validator().object().rules({
    'id': new Validator().number(),
    'name': new Validator().object().rules({
      'value': new Validator().string().validate((str: string) => str.length >= 5),
    }),
  })
  v = [
    { id: 1, name: { value: 'name1' } },
    { id: 2, name: { value: 'name2' } },
  ]
  r = new Validator(v).required().array(customizedValidator).errText('array with customized validator')
  assert.ok(r.result(), 'test array-7 fails')

  customizedValidator = new Validator().object().rules({
    'id': new Validator().number(),
    'name': new Validator().object().rules({
      'value': new Validator().string().validate((str: string) => str.length >= 6),
    }),
  })
  v = [
    { id: 1, name: { value: 'name1' } },
    { id: 2, name: { value: 'name2' } },
  ]
  r = new Validator(v).required().array(customizedValidator).errText('array with customized validator')
  assert.deepStrictEqual(r.result(), false, 'test array-8 fails')

  r = new Validator(v).required().array().errText('array with no validator')
  assert.ok(r.result(), 'test array-9 fails')

  console.log('\x1B[32m%s\x1B[0m', 'Array tests passed!')
  console.log('==========')
} catch (error) {
  console.log(error)
}

// time consumption

try {
  console.log('==========')
  v = []
  for (let i = 1; i <= 10000; i++) {
    v.push({ id: i, name: { value: `name${i}` } })
  }
  const start = Date.now()

  customizedValidator = new Validator().object().rules({
    'id': new Validator().number(),
    'name': new Validator().object().rules({
      'value': new Validator().string(),
    }),
  })
  r = new Validator(v).array(customizedValidator).errText('array with customized validator')
  assert.ok(r.result(), 'test array-7-time-test fails')

  const end = Date.now()
  console.log('\x1B[32m%s\x1B[0m', `Run 1w array item checks, consumption time: ${end - start} ms.`)
  console.log('==========')
} catch (error) {
  console.log(error)
}

// r = new Validator().required().number().min(2).max(2).errText('require number between 1 and 2')
// // assert.deepStrictEqual(r.result(), false, 'test number-2 fails')
// console.log(r.result())
