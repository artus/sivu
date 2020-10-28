import * as assert from 'assert';
import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from '../../ErrorMessages';
import { Page } from '../Page';

const validValues = ['some', 'test', 'values'];
const validPageNumber = 1;
const validTotalPages = 10;
const validTotalSize = 100;

describe('Page', () => {
  describe('constructor', () => {
    it('Should throw an error when supplying invalid parameters', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new Page(null as any, validPageNumber, validTotalPages, validTotalSize), new Error(CAN_NOT_BE_NULL('Values')));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new Page(undefined as any, validPageNumber, validTotalPages, validTotalSize), new Error(CAN_NOT_BE_NULL('Values')));
      assert.throws(() => new Page(validValues, -1, validTotalPages, validTotalSize), new Error(CAN_NOT_BE_NEGATIVE('Page number')));
      assert.throws(() => new Page(validValues, validPageNumber, -1, validTotalSize), new Error(CAN_NOT_BE_NEGATIVE('Total amount of pages')));
      assert.throws(() => new Page(validValues, validPageNumber, validTotalPages, -1), new Error(CAN_NOT_BE_NEGATIVE('Total size')));
    });

    it('Should not throw an error when supplying valid parameters', () => {
      assert.doesNotThrow(() => new Page(validValues, validPageNumber, validTotalPages, validTotalSize));
    });

    it('Should set the instance variables according to the supplied values', () => {
      const page = new Page(validValues, validPageNumber, validTotalPages, validTotalSize);

      assert.strictEqual(page.values, validValues);
      assert.strictEqual(page.pageNumber, validPageNumber);
      assert.strictEqual(page.totalPages, validTotalPages);
      assert.strictEqual(page.totalSize, validTotalSize);
    });
  });

  describe('get', () => {
    it('Should return the length of the encapsulated values', () => {
      const page = new Page(validValues, validPageNumber, validTotalPages, validTotalSize);

      assert.strictEqual(page.size, validValues.length);
    });
  });
});