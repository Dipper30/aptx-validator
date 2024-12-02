import AnyValidator from "./AnyValidator";
import AllValidator from "./AllValidator";
import { ValidateFunction } from "./types";
import Utils, { isEmptyValue } from "./Utils";

/**
 * Validator for Array parameters, which includes multiple Array validation methods.
 */
class ArrayValidator<
  T extends AllValidator,
  O extends boolean = false,
> extends AllValidator<T, O, false> {
  override output: T;
  #validationTasks: ValidateFunction[] = [];
  #optional = false;
  #rule: T;

  constructor(v?: T) {
    super();
    this.output = {} as any;
    const any = new AnyValidator();
    this.#rule = v || (any as unknown as T);
    this.isOptional = false as O;
    this.#addValidation(Utils.array());
  }

  #addValidation(fn: ValidateFunction) {
    this.#validationTasks.push(fn);
  }

  custom(fn: ValidateFunction) {
    this.#addValidation(fn);
    return this;
  }

  optional() {
    this.#optional = true;
    // ts-ignore
    return this as ArrayValidator<T, true>;
  }

  minLength(min: number) {
    this.#addValidation(Utils.minLength(min));
    return this;
  }

  maxLength(max: number) {
    this.#addValidation(Utils.maxLength(max));
    return this;
  }

  override test(p?: any) {
    if (isEmptyValue(p)) {
      return this.#optional;
    }

    for (const fn of this.#validationTasks) {
      if (!fn(p)) return false;
    }

    if (this.#rule) {
      for (const v of p!) {
        if (!this.#rule.test(v)) {
          this.errText(this.#rule.getErrText());
          return false;
        }
      }
    }

    return true;
  }
}

export default ArrayValidator;
