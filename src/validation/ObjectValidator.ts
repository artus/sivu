import _isNil  from 'lodash/isNil';

/**
 * The ObjectValidator contains methods to validate objects.
 */
export class ObjectValidator {

  /**
   * Validate whether the supplied object is not null.
   * 
   * @param {Object} value - The value that needs to be validated.
   * @param {string} errorMessage - The message of the Error that will be thrown if validation fails.
   * @returns {Object} The validated object.
   */
  public static checkNotNull<Type>(value: Type | null | undefined, errorMessage: string) : Type {
    if (_isNil(value)) {
      throw new Error(errorMessage);
    }
    return value;
  }
}