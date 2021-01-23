import * as assert from 'assert';
import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from '../../ErrorMessages';
import { Ordering } from '../../query/Ordering';
import { QueryOptions } from '../../query/QueryOptions';
import { Page } from '../Page';

const validValues = ['some', 'test', 'values'];
const validTotalPages = 10;
const validTotalSize = 100;
const validQueryOptions = new QueryOptions(1, 10, Ordering.ASCENDING);

describe('Page', () => {
  describe('constructor', () => {
    it('Should throw an error when supplying invalid parameters', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new Page(null as any, validTotalPages, validTotalSize, validQueryOptions), new Error(CAN_NOT_BE_NULL('Values')));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new Page(undefined as any, validTotalPages, validTotalSize, validQueryOptions), new Error(CAN_NOT_BE_NULL('Values')));
      assert.throws(() => new Page(validValues, -1, validTotalSize, validQueryOptions), new Error(CAN_NOT_BE_NEGATIVE('Total amount of pages')));
      assert.throws(() => new Page(validValues, validTotalPages, -1, validQueryOptions), new Error(CAN_NOT_BE_NEGATIVE('Total size')));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new Page(validValues, validTotalPages, validTotalSize, (null as any)), new Error(CAN_NOT_BE_NULL('Query options')));
    });

    it('Should not throw an error when supplying valid parameters', () => {
      assert.doesNotThrow(() => new Page(validValues, validTotalPages, validTotalSize, validQueryOptions));
    });

    it('Should set the instance variables according to the supplied values', () => {
      const page = new Page(validValues, validTotalPages, validTotalSize, validQueryOptions);

      assert.strictEqual(page.values, validValues);
      assert.strictEqual(page.pageNumber, validQueryOptions.pageNumber);
      assert.strictEqual(page.totalPages, validTotalPages);
      assert.strictEqual(page.totalSize, validTotalSize);
      assert.strictEqual(page.queryOptions, validQueryOptions);
    });
  });

  describe('size', () => {
    it('Should return the length of the encapsulated values', () => {
      const page = new Page(validValues, validTotalPages, validTotalSize, validQueryOptions);

      assert.strictEqual(page.size, validValues.length);
    });
  });

  describe('pageNumber', () => {
    it('Should return the current page number of the encapsulated QueryOptions', () => {
      const page = new Page(validValues, validTotalPages, validTotalSize, validQueryOptions);

      assert.strictEqual(page.pageNumber, validQueryOptions.pageNumber);
    });
  });

  describe('isLastPage', () => {
    it('Should return true when this Page is the last page', () => {
      const queryOptions = new QueryOptions(1, 10);
      const page = new Page([], 1, 10, queryOptions);

      assert.ok(page.isLastPage());
    });

    it('Should return false when this Page is not the last page', () => {
      const queryOptions = new QueryOptions(1, 10);
      const page = new Page([], 3, 30, queryOptions);

      assert.ok(!page.isLastPage());
    });
  });

  describe('isFirstPage', () => {
    it('Should return true when this Page is the first page', () => {
      const queryOptions = new QueryOptions(1, 10);
      const page = new Page([], 1, 10, queryOptions);

      assert.ok(page.isFirstPage());
    });

    it('Should return false when this Page is not the first page', () => {
      const queryOptions = new QueryOptions(3, 10);
      const page = new Page([], 3, 30, queryOptions);

      assert.ok(!page.isFirstPage());
    });
  });

  describe('queryNextPage', () => {
    it('Should return a QueryOptions object to fetch the next page', () => {
      const queryOptions = new QueryOptions(1, 10);
      const page = new Page([], 3, 30, queryOptions);

      const newQueryOptions = page.queryNextPage();

      assert.strictEqual(newQueryOptions.pageNumber, queryOptions.pageNumber + 1);
    });

    it('Should return the same queryOptions object when we are already on the last page', () => {
      const queryOptions = new QueryOptions(3, 10);
      const page = new Page([], 3, 30, queryOptions);

      const newQueryOptions = page.queryNextPage();

      assert.strictEqual(newQueryOptions, queryOptions);
    })
  });

  describe('queryPreviousPage', () => {
    it('Should return a QueryOptions object to fetch the previous page', () => {
      const queryOptions = new QueryOptions(3, 10);
      const page = new Page([], 3, 30, queryOptions);

      const newQueryOptions = page.queryPreviousPage();

      assert.strictEqual(newQueryOptions.pageNumber, queryOptions.pageNumber - 1);
    });

    it('Should return the same queryOptions object when we are already on the first page', () => {
      const queryOptions = new QueryOptions(1, 10);
      const page = new Page([], 1, 30, queryOptions);

      const newQueryOptions = page.queryPreviousPage();

      assert.strictEqual(newQueryOptions, queryOptions);
    });
  });
});