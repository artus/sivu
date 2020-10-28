import * as assert from 'assert';
import { NumberValidator } from '../NumberValidator';

const negativeValue = -1;
const positiveValue = 1;
const errorMessage = 'This is an error message';

describe('NumberValidator', () => {
  describe('checkNotNegative', () => {
    it('Should throw an error with supplied error message when the supplied value is negative', () => {
      assert.throws(() => NumberValidator.checkNotNegative(negativeValue, errorMessage), new Error(errorMessage));
    });

    it('Should return the supplied value when it is not negative', () => {
      assert.strictEqual(
        NumberValidator.checkNotNegative(positiveValue, errorMessage),
        positiveValue
      );
    })
  });
});