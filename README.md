# aptx-validator

轻量且可拓展的 Javascript 参数校验库，支持 Typescript 类型推断
A lightweight, flexible Javascript package that enables parameter validation, and provides type infer based on Typescript.

## Install

```bash
npm install aptx-validator
```

## Quick Start

```js
import { number } from "aptx-validator";

const validator = number().errText("number required");
validator.test(123); // true

validator.test(true); // false
validator.getErrText(); // 'number required'
```

#### Available Type Checkers

```js
// including 6 type validators and 2 condition validators
import {
  any,
  boolean,
  number,
  string,
  array,
  object,
  or,
  and,
} from "aptx-validator";

// when a validator is claimed, any parameter that satisfies this validator is required(must not be null or undefined or NaN) by default
const v = boolean();
v.test(true); // true
v.test(undefined); // false

// however, you can make the validator optional by claiming 'optional()' function
const v = boolean().optional();
v.test(undefined); // true
```

## Usage

#### Primitive Type Checkers

```js
// all types are optional by default
const numberValidator = number();
numberValidator.test(1); // true
numberValidator.test(true); // false
numberValidator.test(undefined); // false
numberValidator.test(null); // false
numberValidator.test(NaN); // false

const stringValidator = string();
stringValidator.test(1); // false

const booleanValidator = boolean();
booleanValidator.test(false); // true

// optional params
const optionalNumberValidator = number().optional();
numberValidator.test(undefined); // true
numberValidator.test(null); // true
numberValidator.test(NaN); // true
```

#### Object Checker

```js
const objectChecker = object({
  id: number(),
  name: string().optional(),
});
objectChecker.test({
  id: 1,
}); // true
objectChecker.test({
  id: 1,
  name: "Alice",
}); // true
objectChecker.test({
  name: "Bob",
}); // false
```

```js
// and of course objects can be nested
const objectChecker = object({
  id: number(),
  fullName: {
    first: string(),
    middle: string().optional(),
    last: string(),
  },
});
objectChecker.test({
  id: 1,
  fullName: {
    first: "Donald",
    middle: undefined,
    last: "trump",
  },
}); // true
```

#### Array Checker

```js
const arrayChecker = array(number());
arrayChecker1.test([1, 2]); // true
arrayChecker1.test(["1", "2"]); // false
```

```js
// and of course objects can be included in arrays
const arrayChecker = array(
  object({
    id: number(),
  })
);
arrayChecker.test([1, 2]); // false
arrayChecker.test([
  {
    id: 1,
  },
]); // true
```

### And / Or Conditions

```js
const orCondition = or([string(), number()]);
orCondition.test(1); // true
orCondition.test("2"); // true
orCondition.test(true); // false
```

```js
const andCondition = and([
  object({
    id: number(),
    name: number().optional(),
  }),
  object({
    id: number(),
    name: string().optional(),
  }),
]);
andCondition.test({
  id: 1,
  name: 1,
}); // true
andCondition.test({
  id: 1,
  name: "1",
}); // true
```

## Handle Errors

```js
const validator = number().errText("number required");
validator.test(undefined); // false
validator.getErrText(); // 'number required'
```

```js
const validator = object({
  id: number().errText("number required"),
}).errText("object required");
validator.test({}); // false
validator.getErrText(); // 'number required'
```

## Use Validator in Express.js

```js
// validator.ts
import { AllValidator, number, object, Infer } from 'aptx-validator';

/**
 * Middleware
 */
export const bodyValidator = (v: AllValidator) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isValid = v.test(req.body);
    if (!isValid) {
      throw new ParameterException(null, v.getErrText());
    } else {
      next();
    }
  };
};

type GetType<F extends () => AllValidator> = Infer<ReturnType<F>>;

export const postTest = () => {
  return object({
    id: number().errText('number required').errText('ID required'),
  });
};
export type PostTestParams = GetType<typeof postTest>;

// add more validators here...

```

```js
// router.ts
import express, { Router } from "express";
import { UserController } from "@/controllers";
import { bodyValidator, postTest } from "@/validators";

const app = express();
const router = Router();

app.use("/api", router);

// what routers do
router.post("/register", bodyValidator(postTest()), UserController.register);

app.listen(3000, () => console.log("validator demo started on 3000!"));
```
