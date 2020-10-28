import _isNil  from 'lodash/isNil';

export class ObjectValidator {
  public static checkNotNull<Type>(value: Type | null | undefined, errorMessage: string) : Type {
    if (_isNil(value)) {
      throw new Error(errorMessage);
    }
    return value;
  }
}