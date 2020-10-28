import * as assert from 'assert';
import { Ordering } from '../Ordering';

describe('Ordering', () => {
  describe('ASCENDING', () => {
    it('Returns the literal string \'asc\'', () => {
      assert.strictEqual(Ordering.ASCENDING, 'asc');
    });
  });
  describe('DESCENDING', () => {
    it('Returns the literal string \'desc\'', () => {
      assert.strictEqual(Ordering.DESCENDING, 'desc');
    });
  });
});