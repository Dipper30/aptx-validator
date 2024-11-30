import "module-alias";
import BooleanValidator from "./BooleanValidator";
import ObjectValidator from "./ObjectValidator";
import NumberValidator from "./NumberValidator";
import StringValidator from "./StringValidator";
import AnyValidator from "./AnyValidator";
import ArrayValidator from "./ArrayValidator";
import AllValidator from "./AllValidator";
import { OrCondition, AndCondition } from "./helpers";
import { AndParams, ARecord, OrParams, Infer } from "./types";

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
  Infer,
};
