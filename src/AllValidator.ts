export default class AllValidator<Output extends any = any, Optional extends boolean = any, Nullable extends boolean = any> {
  #errText: string = 'validation error';
  isOptional: Optional;
  isNullable: Nullable;
  output: Output;

  constructor() {
    this.isOptional = false as Optional;
    this.isNullable = false as Nullable;
    this.output = undefined as Output;
  }

  /**
   * Set error text and return itself.
   * @param {string} errorText
   * @returns {BooleanValidator} BooleanValidator
   */
  errText(errorText: string) {
    this.#errText = errorText;
    return this;
  }

  /**
   * Get error text.
   * @returns {string} error text
   */
  getErrText() {
    return this.#errText;
  }

  test(v?: any): boolean {
    return v;
  }

}