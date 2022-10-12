# aptx-validator
易用且可拓展的 Node.js 参数校验库

## 安装

``` bash
npm install aptx-validator
```

## 示例

#### 

#### 类型校验

``` js
import { Validator } from 'aptx-validator'

const param = 123
const validator = new Validator(param).required().number().errText('number required')
validator.result() // true
```

#### 错误处理

``` js
import { Validator } from 'aptx-validator'

const param = '123'
const validator = new Validator(param).required().number().errText('number required')
validator.result() // false

validator.error() // Error: number required ...
validator.getErrText() // 'number required'
```

#### 在 Express 中使用参数校验

``` js
// router.js 文件
import UserValidator from '@/validators'
import UserController from '@/controllers'
import express, { Router } from 'express'

const app = express()
const router = Router()

app.use('/api', router)


router.post('/register', UserValidator.register, UserController.register)

app.listen(3000, () => console.log('Aptx validator demo started on 3000!'))
```

``` js
// UserValidator.js 文件
import { Validator } from 'aptx-validator'

class UserValidator {

  // 自定义校验规则
  customizedEmailValidator = new Validator().string().useRE(/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/).errText('Invalid Email!')

  // 校验器中间件
  register (req, res, next) {
    // 定义校验规则
    const validator = new Validator(req.body).required().object().rules({
      'id': new Validator().required().number().min(1).errText('id 校验错误'),
      'username': new Validator().required().string().minLength(4).maxLength(18),
      'password': new Validator().required().string().useRE(/\d{6,18}/g),
      'email': customizedEmailValidator,
    }).errText('参数错误')

    if (!validator.result()) {
      // 返回 Error
      next(validator.error())
    }

    next()
  }

}

export default UserValidator
```

## 基本用法

#### 基本类型

``` js
// 默认为非必须字段
const numberValidator = new Validator(123).number()
numberValidator.result() // true
const stringValidator = new Validator('123').required().string()
stringValidator.result() // true
const booleanValidator = new Validator(false).boolean()
booleanValidator.result() // true

// 当传入值为 null 或者 undefined 或者 NaN 时, 默认为合法值
new Validator().number().result() // true
new Validator(null).number().result() // true
new Validator(undefined).number().result() // true
new Validator(NaN).number().result() // true

// required() 声明为必须字段
new Validator(null).required().number().result() // false
```

#### 数组

``` js
// array() 方法声明一个数组变量
// array() 方法可以传入参数
// 1. 空, 对数组中的值没有定义校验规则
// 2. number, 数组中的值必须为 number
// 3. string, 数组中的值必须为 string
// 4. boolean, 数组中的值必须为 boolean
// 5. Validator, 传入一个 Validator 校验器
new Validator([1, 2, 3]).required().array('number').errText('number[]').result() // true
new Validator([1, 2, 3]).required().array('string').result() // false
```

#### 对象

``` js
// 使用 rules() 方法传入一个对象
new Validator({ id: 1, name: 'Alice' }).object().rules({
  'id': new Validator().required().number(),
  'name': new Validator().required().string(),
})
.errText('对象参数错误')
.result() // true
```

#### 类型嵌套

``` js
// 对象中的对象
new Validator({
  id: 1,
  name: { firstName: 'Alice', middleName: null, lastName: 'Wonderland' },
  }).object().rules({
  'id': new Validator().required().number(),
  'name': new Validator().required().obejct().rules({
    'firstName': new Validator().required().string().minLength(1),
    'middleName': new Validator().string(),
    'lastName': new Validator().required().string().minLength(1),
  }),
})
.result() // true
```

``` js
// 数组中的对象
// 嵌套复杂时可以做拆分

const param = [
  {
    id: 1,
    name: { firstName: 'Alice', middleName: null, lastName: 'Wonderland' },
  },
  {
    id: 2,
    name: { firstName: 'Bob', middleName: null, lastName: '' },
  },
]

const objectValidator = new Validator().object().rules({
  'id': new Validator().required().number(),
  'name': new Validator().required().obejct().rules({
    'firstName': new Validator().required().string().minLength(1),
    'middleName': new Validator().string(),
    'lastName': new Validator().required().string().minLength(1),
  })

new Validator(param).array(objectValidator).result() // false, Bob 的 lastName 不符合 minLength(1)
```

## 拓展

#### 自定义校验方法

``` js
// 有时校验方法并不能满足全部需求, 开发人员可以自定义方法并投入使用

const isOdd = (param) => param % 2 === 1 // 是否为奇数

// 使用 validate 进行自定义方法声明
new Validator(13).required().number().validate(isOdd).result() // true

```

#### 自定义校验器

``` js
// 对常用的或逻辑复杂的校验器可以做拆分并复用

// 这是一个毫无逻辑的 String 校验器
const customizedValidator = new Validator().required().string().minLength(12).validate(
  (param) => param.split('&').length > 2
)

// 使用 use 方法声明自定义校验器
new Validator('123==&==123').string().maxLength(20).use(customizedValidator).result() // false

```

#### 重写判断方法

``` js
// 如果以上拓展方式不能满足所有需求, 开发人员可以选择对原生校验方法进行修改
// override 会对原生方法造成不可逆的影响, 声明时应放在全局头部以避免混乱
import { override, Validator } from 'aptx-validator'

/**
 * @param { keyof Utils } fnName 一个已经存在的原生方法名
 * @param { UtilFunction } overrideFunction 返回校验方法的高阶函数
 */
override('min', (min: number) => ((param: number) => param <= min)) // 将最小值判定修改为最大值判定

new Validator(10).number().min(8).result() // false
new Validator(10).number().min(12).result() // true
```

## 文档

``` md
// TODO
```