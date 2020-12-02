import _isNil  from 'lodash/isNil';

/**
 * The StringValidator contains methods to validate strings.
 */
export class StringValidator {

  /**
   * Validate whether the supplied string is not null or empty.
   * 
   * @param {string} value - The value that needs to be validated.
   * @param {string} errorMessage - The message of the Error that will be thrown when validation fails.
   * @returns {string} The validated string.
   */
  public static checkNotNullOrEmpty(value: string | null | undefined, errorMessage: string) : string {
    if (_isNil(value) || !value.trim().length) {
      throw new Error(errorMessage);
    }
    return value;
  }
}