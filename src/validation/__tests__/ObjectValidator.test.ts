import * as assert from 'assert';
import { ObjectValidator } from '../ObjectValidator';

const errorMessage = 'This is an error message';

describe('ObjectValidator', () => {
  describe('checkNotNull', () => {
    it('Should throw an error with supplied error message when the supplied value is null', () => {
      assert.throws(() => ObjectValidator.checkNotNull(null, errorMessage), new Error(errorMessage));
    });

    it('Should return the supplied value when it is not null', () => {
      const validValue = {};
      assert.strictEqual(
        ObjectValidator.checkNotNull(validValue, errorMessage),
        validValue
      );
    })
  });
});