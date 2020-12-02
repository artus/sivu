import * as assert from 'assert';
import { Ordering } from '../..';
import { SivuDeserializer } from '../SivuDeserializer';

describe('SivuDeserializer', () => {
  describe('page', () => {
    it('Should throw an error when we supply null', () => {
      assert.throws(() => SivuDeserializer.page(null));
    });

    it('Should return the raw values when no valueDeserializer is supplied', () => {

      const serializedPage = {
        values: ["1", "2", "3"],
        pageNumber: 1,
        size: 3,
        totalPages: 10,
        totalSize: 30
      };

      const deserializedPage = SivuDeserializer.page(serializedPage);
      const notSameValues = serializedPage.values.filter(value => !deserializedPage.values.includes(value));

      assert.ok(notSameValues.length === 0);
      assert.strictEqual(deserializedPage.pageNumber, serializedPage.pageNumber);
      assert.strictEqual(deserializedPage.size, serializedPage.size);
      assert.strictEqual(deserializedPage.totalPages, serializedPage.totalPages);
      assert.strictEqual(deserializedPage.totalSize, serializedPage.totalSize);
    });

    it('Should return the deserialized values when a valueDeserializer is supplied', () => {

      const serializedPage = {
        values: ["1", "2", "3"],
        pageNumber: 1,
        size: 3,
        totalPages: 10,
        totalSize: 30
      };

      const valueDeserializer = (value: string) => value + "-deserialized";

      const deserializedPage = SivuDeserializer.page(serializedPage, valueDeserializer);
      const deserializedValues = serializedPage.values.map(valueDeserializer);
      const notSameValues = deserializedValues.filter(value => !deserializedPage.values.includes(value));

      assert.ok(notSameValues.length === 0);
      assert.strictEqual(deserializedPage.pageNumber, serializedPage.pageNumber);
      assert.strictEqual(deserializedPage.size, serializedPage.size);
      assert.strictEqual(deserializedPage.totalPages, serializedPage.totalPages);
      assert.strictEqual(deserializedPage.totalSize, serializedPage.totalSize);
    });
  });

  describe('queryOptions', () => {
    it('Should throw an error when we supply null.', () => {
      assert.throws(() => SivuDeserializer.queryOptions(null));
    });

    it('Should return the deserialized QueryOptions when we supply a valid JSON object', () => {

      const serializedQueryOptions = {
        pageNumber: 1,
        pageSize: 1,
        order: 'asc',
        sortBy: 'name'
      };

      const deserializedQueryOptions = SivuDeserializer.queryOptions(serializedQueryOptions);

      assert.strictEqual(deserializedQueryOptions.pageNumber, serializedQueryOptions.pageNumber);
      assert.strictEqual(deserializedQueryOptions.pageSize, serializedQueryOptions.pageSize);
      assert.strictEqual(deserializedQueryOptions.sortBy, serializedQueryOptions.sortBy);
      assert.strictEqual(deserializedQueryOptions.order, Ordering.ASCENDING);
    });
  });

  describe('ordering', () => {
    it('Should throw an error when we do not supply either "asc" or "desc"', () => {
      assert.throws(() => SivuDeserializer.ordering('test'));
    });

    it('Should return the correct Ordering when we supply either "asc" or "desc".', () => {
      assert.strictEqual(SivuDeserializer.ordering('asc'), Ordering.ASCENDING);
      assert.strictEqual(SivuDeserializer.ordering('desc'), Ordering.DESCENDING);
    });
  });
});