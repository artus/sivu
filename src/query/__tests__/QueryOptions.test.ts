import assert from 'assert';

import { CAN_NOT_BE_LESS_THAN, CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from '../../ErrorMessages';
import { Ordering } from "../Ordering";
import { QueryOptions } from './../QueryOptions';

const validPageNumber = 1;
const validPageSize = 10;
const validOrder = Ordering.ASCENDING;
const validSortBy = 'date';

describe('QueryOptions', () => {
  describe('constructor', () => {
    it('Throws an error when supplying invalid parameters', () => {
      assert.throws(() => new QueryOptions(-1, validPageSize, validOrder, validSortBy), new Error(CAN_NOT_BE_LESS_THAN(1, 'Page number')));
      assert.throws(() => new QueryOptions(validPageNumber, -1, validOrder, validSortBy), new Error(CAN_NOT_BE_NEGATIVE('Page size')));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => new QueryOptions(validPageNumber, validPageSize, (null as any), validSortBy), new Error(CAN_NOT_BE_NULL('Order')));
    });

    it('Should set the instance variables according to the supplied parameters', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder, validSortBy);

      assert.strictEqual(queryOptions.pageNumber, validPageNumber);
      assert.strictEqual(queryOptions.pageSize, validPageSize);
      assert.strictEqual(queryOptions.order, validOrder);
      assert.strictEqual(queryOptions.sortBy, validSortBy);
    });

    it('Should not throw an error when not supplying order or sortBy', () => {
      assert.doesNotThrow(() => new QueryOptions(validPageNumber, validPageSize));
    });
  });

  describe('getQueryString', () => {
    it('Returns a querystring representation of the QueryOptions instance', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder, validSortBy);
      const expectedQueryString = '?pageNumber=1&pageSize=10&order=asc&sort=date';

      assert.strictEqual(queryOptions.getQueryString(), expectedQueryString);
    });

    it('Should not add the \'?\' prefix when supplying false', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder, validSortBy);
      const expectedQueryString = 'pageNumber=1&pageSize=10&order=asc&sort=date';

      assert.strictEqual(queryOptions.getQueryString(false), expectedQueryString);
    });

    it('Should not include sort when it is not supplied', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder);
      const expectedQueryString = '?pageNumber=1&pageSize=10&order=asc';

      assert.strictEqual(queryOptions.getQueryString(), expectedQueryString);
    });
  });

  describe('previous', () => {
    it('Should return a new QueryOptions object with the page number decreased by 1', () => {
      const queryOptions = new QueryOptions(2, 2);
      const newQueryOptions = queryOptions.previous();

      assert.strictEqual(newQueryOptions.pageNumber, 1);
      assert.strictEqual(newQueryOptions.pageSize, queryOptions.pageSize);
      assert.strictEqual(newQueryOptions.order, queryOptions.order);
      assert.strictEqual(newQueryOptions.sortBy, queryOptions.sortBy);
    });

    it('Should return the same QueryOptions when we are already on the same page', () => {
      const queryOptions = new QueryOptions(1, 1);

      assert.strictEqual(queryOptions.previous(), queryOptions);
    });
  });

  describe('toPage', () => {
    it('Should throw an Error when we supply invalid parameters', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder, validSortBy);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      assert.throws(() => queryOptions.toPage((null as any), 1, 1));
      assert.throws(() => queryOptions.toPage([], -1, 1));
      assert.throws(() => queryOptions.toPage([], 1, -1));
    });

    it('Should return a Page with the values that were supplied', () => {
      const queryOptions = new QueryOptions(validPageNumber, validPageSize, validOrder, validSortBy);
      const results = ["test", "results"];
      const page = queryOptions.toPage(results, 10, 20);

      assert.strictEqual(page.values, results);
      assert.strictEqual(page.pageNumber, queryOptions.pageNumber);
      assert.strictEqual(page.totalPages, 10);
      assert.strictEqual(page.totalSize, 20);
    });
  });
});