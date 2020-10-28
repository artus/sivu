export class NumberValidator {
  public static checkNotNegative(value: number, errorMessage: string) : number {
    if (value < 0) {
      throw new Error(errorMessage);
    }
    return value;
  }
}