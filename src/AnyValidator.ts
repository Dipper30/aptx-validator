import AllValidator from './AllValidator';

/**
 * Validator for Any parameter, except undefined if required.
 */
class AnyValidator<Optional extends boolean = true, N extends boolean = true> extends AllValidator<any, Optional, N> {
  override output: any;
  #optional = true;
  constructor() {
    super();
    this.output = false;
  }

  optional() {
    this.#optional = true;
    return this as AnyValidator<true>;
  }

  override test(p?: any) {
    if (p === undefined) {
      return this.#optional;
    }
    return true;
  }
}

export default AnyValidator;