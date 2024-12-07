import AnyValidator from '../AnyValidator';
import ArrayValidator from '../ArrayValidator';
import AllValidator from '../AllValidator';
import BooleanValidator from '../BooleanValidator';
import NumberValidator from '../NumberValidator';
import ObjectValidator from '../ObjectValidator';
import StringValidator from '../StringValidator';
import { AndCondition, OrCondition } from '../helpers';
export interface IValidator {
  result: () => boolean;
  errText: (text: string) => void;
  error: () => Error;
}

// export type UtilFunction = (value: any, option?: any) => boolean

export type ValidateFunction = (value: any, option?: any) => boolean;
export type UtilFunction = (option?: any) => ValidateFunction;

export interface IUtils {
  number: UtilFunction;
  boolean: UtilFunction;
  string: UtilFunction;
  object: UtilFunction;
  array: UtilFunction;

  // any
  oneof: UtilFunction;

  // number
  min: UtilFunction;
  max: UtilFunction;
  int: UtilFunction;
  positive: UtilFunction;
  negative: UtilFunction;
  id: UtilFunction;
  toFixed: UtilFunction;

  // string
  minLength: UtilFunction;
  maxLength: UtilFunction;
  numeric: UtilFunction;
  booleanStr: UtilFunction;
  useRE: UtilFunction;
  email: UtilFunction;
  phone: UtilFunction;
  date: UtilFunction;
}

export type ARecord = Record<string, AllValidator<any, boolean>>;
export type OrParams = Readonly<
  [
    AllValidator<any, boolean>,
    AllValidator<any, boolean>,
    ...AllValidator<boolean>[],
  ]
>;
export type AndParams = Readonly<
  [AllValidator<any, boolean>, AllValidator<any, boolean>]
>;

export type Infer<Input extends AllValidator<any, boolean>> =
  Input extends AnyValidator
    ? any
    : Input extends
          | BooleanValidator<boolean>
          | NumberValidator<boolean>
          | StringValidator<boolean>
      ? OptionalInfer<Input>
      : Input extends OrCondition<OrParams, boolean, boolean>
        ? Input['isOptional'] extends false
          ? OrInfer<Input['output']>
          : OrInfer<Input['output']> | undefined
        : Input extends AndCondition<AndParams, boolean, boolean>
          ? Input['isOptional'] extends false
            ? AndInfer<Input['output']>
            : AndInfer<Input['output']> | undefined
          : Input extends ArrayValidator<any, boolean>
            ? Input['isOptional'] extends false
              ? ArrayInfer<Input['output']>
              : ArrayInfer<Input['output']> | undefined
            : Input extends ObjectValidator<any, boolean>
              ? Input['isOptional'] extends false
                ? ObjectInfer<Input['output']>
                : ObjectInfer<Input['output']> | undefined
              : never;

export type ComputedOptionalKey<T extends ARecord> = {
  [k in keyof T]: T[k]['isOptional'];
};

export type SelectRequiredKey<T extends Record<string, boolean>> = keyof {
  [k in keyof T as T extends Record<k, false> ? k : never]: k;
};

export type ObjectRule<T extends ARecord> = {
  [k in keyof T]?: Infer<T[k]>;
};

export type UnionType<T> = T extends (infer E)[] ? E : never;

export type PickRequiredKey<T, K extends keyof T> = Omit<T, K> & {
  [k in K]-?: T[k];
};

export type ObjectInfer<A extends ARecord> = PickRequiredKey<
  ObjectRule<A>,
  SelectRequiredKey<ComputedOptionalKey<A>>
>;
export type ArrayInfer<A extends AllValidator<boolean>> = Infer<A>[];
export type OrInfer<A extends OrParams> = UnionType<OrObject<A>>;
export type AndInfer<A extends AndParams> = Infer<A[0]> & Infer<A[1]>;
export type OptionalInfer<V extends AllValidator<any, boolean>> =
  V['isOptional'] extends true ? V['output'] | undefined : V['output'];
export type OrObject<T extends OrParams> = {
  [k in keyof T]: Infer<T[k]>;
};
export type AndObject<T extends AndParams> = {
  [k in keyof T]: Infer<T[k]>;
};

export type OptionalValidator<T extends AllValidator> = Exclude<
  T,
  'isOptional'
> & { isOptional: true };

export const boolean = () => new BooleanValidator<false>();
export const number = () => new NumberValidator<false>();
export const string = () => new StringValidator<false>();
export const object = <T extends ARecord = any>(v?: T) =>
  new ObjectValidator<T>(v);
export const array = <T extends AllValidator = AnyValidator>(v?: T) =>
  new ArrayValidator<T>(v);
export const any = () => new AnyValidator<true>();
export const or = <T extends OrParams = any>(p: T) => new OrCondition<T>(p);
export const and = <T extends AndParams = any>(p: T) => new AndCondition<T>(p);

export default {
  boolean,
  object,
  number,
  string,
  any,
  array,
  or,
  and,
};

export type {
  BooleanValidator,
  ObjectValidator,
  NumberValidator,
  StringValidator,
  AnyValidator,
  ArrayValidator,
  AllValidator,
  OrCondition,
  AndCondition,
};
