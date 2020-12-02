import * as assert from 'assert';
import { StringValidator } from '../StringValidator';

const validValue = "test";
const errorMessage = 'This is an error message';

describe('StringValidator', () => {
  describe('checkNotNullOrEmpty', () => {
    it('Should throw an error with supplied error message when the supplied value is null', () => {
      assert.throws(() => StringValidator.checkNotNullOrEmpty(null, errorMessage), new Error(errorMessage));
    });

    it('Should throw an error with supplied error message when the supplied value is empty', () => {
      assert.throws(() => StringValidator.checkNotNullOrEmpty("", errorMessage), new Error(errorMessage));
    });

    it('Should return the supplied value when it is not null or empty', () => {
      assert.strictEqual(
        StringValidator.checkNotNullOrEmpty(validValue, errorMessage),
        validValue
      );
    })
  });
});