/**
 * The NumberValidator contains methods to validate numbers.
 */
export class NumberValidator {

  /**
   * Validate whether the supplied value is not negative.
   * 
   * @param {number} value - The number that needs to be validated.
   * @param {string} errorMessage - The message of the Error that will be thrown when validation fails.
   * @returns {number} - The validated number.
   */
  public static checkNotNegative(value: number, errorMessage: string) : number {
    if (value < 0) {
      throw new Error(errorMessage);
    }
    return value;
  }

  public static checkNotLessThan(min: number, value: number, errorMessage: string): number {
    if (value < min) {
      throw new Error(errorMessage);
    }
    return value;
  }
}