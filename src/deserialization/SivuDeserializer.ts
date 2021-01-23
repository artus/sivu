/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ordering, QueryOptions } from "..";
import { ObjectValidator } from "../validation/ObjectValidator";
import { StringValidator } from "../validation/StringValidator";
import { Page } from '../pagination/Page';
import { CAN_NOT_BE_EMPTY, CAN_NOT_BE_NULL } from "../ErrorMessages";

/**
 * The SivuDeserializer can be used to deserliaze sivu objects from arbitrary objects.
 */
export class SivuDeserializer {

  /**
   * Deserialize a JSON object to a Page object.
   * 
   * @param {Object} body - The object that was deserialized using JSON.parse.
   * @param {Function} [valueDeserializer] - The function that can be used to deserialize the value embedded in the Page.
   */
  public static page<T>(
    body: any, valueDeserializer: (valueJSON: any) => T = (valueJSON: any) => valueJSON
  ): Page<T> {
    ObjectValidator.checkNotNull(valueDeserializer, CAN_NOT_BE_NULL('Value deserializer'));
    ObjectValidator.checkNotNull(body, CAN_NOT_BE_NULL('Page JSON'));

    const values = body.values.map(valueDeserializer);
    const queryOptions = SivuDeserializer.queryOptions(body.queryOptions);

    return new Page(
      values,
      body.totalPages,
      body.totalSize,
      queryOptions
    );
  }

  /**
   * Deserialize a JSON object to a QueryOptions object.
   * 
   * @param {Object} body - The object that was deserialized using JSON.parse.
   */
  public static queryOptions(body: any): QueryOptions {
    ObjectValidator.checkNotNull(body, CAN_NOT_BE_NULL('Query Options JSON'));

    return new QueryOptions(
      body.pageNumber,
      body.pageSize,
      SivuDeserializer.ordering(body.order),
      body.sortBy
    );
  }

  /**
   * Parse an order from a string.
   * 
   * @param {string} order - The order as a string value. Can be either 'asc' or 'desc'.
   */
  public static ordering(order: string): Ordering {
    StringValidator.checkNotNullOrEmpty(order, CAN_NOT_BE_EMPTY('Order'));

    switch (order) {
      case Ordering.ASCENDING:
        return Ordering.ASCENDING;
      case Ordering.DESCENDING:
        return Ordering.DESCENDING;
      default:
        throw new Error(`Order '${order}' is not valid, should be 'asc' or 'desc'.`);
    }
  }
}