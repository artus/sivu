import { CAN_NOT_BE_LESS_THAN, CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
import { Page } from "../pagination/Page";
import { NumberValidator } from "../validation/NumberValidator";
import { ObjectValidator } from "../validation/ObjectValidator";
import { Ordering } from "./Ordering";

export class QueryOptions {

  /**
   * The page number of the requested page.
   */
  readonly pageNumber: number;

  /**
   * The size of the requested page.
   */
  readonly pageSize: number;

  /**
   * The ordering of the query.
   */
  readonly order: Ordering;

  /**
   * The field(s) that should be sorted by.
   */
  readonly sortBy: string;

  /**
   * @constructor Create a new QueryOptions object.
   * @classdesc QueryOptions reflects the options that should be send to an API when requesting pages.
   * 
   * @param {number} pageNumber - The page number of the requested page.
   * @param {number} pageSize - The size of the requested page.
   * @param {Ordering} [order=ASCENDING] - The ordering of the query.
   * @param {string} [sortBy="asc"] - The field(s) that should be sorted by.
   */
  constructor(
    pageNumber: number,
    pageSize: number,
    order: Ordering = Ordering.ASCENDING,
    sortBy = ''
  ) {
    this.pageNumber = NumberValidator.checkNotLessThan(1, pageNumber, CAN_NOT_BE_LESS_THAN(1, 'Page number'));
    this.pageSize = NumberValidator.checkNotNegative(pageSize, CAN_NOT_BE_NEGATIVE('Page size'));
    this.order = ObjectValidator.checkNotNull(order, CAN_NOT_BE_NULL('Order'));
    this.sortBy = sortBy;
  }

  /**
   * Stringify this QueryOptions so that it can be used in a URL.
   * 
   * @param {boolean} [includePrefix=true] - Whether the '?' prefix should be included or not.
   * @returns {string} The serialized version of these QueryOptions that can be used in a URL. e.g. '?pageNumber=1&pageSize=15&order=asc&sortBy=name&search='.
   */
  public getQueryString(includePrefix = true): string {
    let queryString = `pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&order=${this.order}`;

    if (this.sortBy) {
      queryString = `${queryString}&sort=${this.sortBy}`;
    }

    if (includePrefix) {
      queryString = `?${queryString}`;
    }

    return queryString;
  }

  /**
   * Get QueryOptions to request the previous page. Page number will never go below 0.
   * 
   * @returns {QueryOptions} The QueryOptions with page number decreased.
   */
  public previous(): QueryOptions {
    if (this.pageNumber === 1) {
      return this;
    } else {
      return new QueryOptions(
        this.pageNumber - 1,
        this.pageSize,
        this.order,
        this.sortBy
      );
    }
  }

  /**
   * Get QueryOptions to request the next page.
   * 
   * @returns {QueryOptions} The QueryOptions with page number increased.
   */
  public next(): QueryOptions {
    return new QueryOptions(
      this.pageNumber + 1,
      this.pageSize,
      this.order,
      this.sortBy
    );
  }

  /**
   * Convert the results of this query to a Page that can be sent back to the issuer.
   * 
   * @param {Array<T>} results - The results of this query.
   * @param {number} totalPages - The total amount of pages for the results of this query..
   * @param {number} totalSize - The total size of all results of this query.
   */
  public toPage<T>(
    results: T[],
    totalPages: number,
    totalSize: number
  ): Page<T> {
    ObjectValidator.checkNotNull(results, CAN_NOT_BE_NULL('Results'));
    NumberValidator.checkNotNegative(totalPages, CAN_NOT_BE_NEGATIVE('Total amount of pages'));
    NumberValidator.checkNotNegative(totalSize, CAN_NOT_BE_NEGATIVE('Total size'));

    return new Page(
      results,
      totalPages,
      totalSize,
      this
    );
  }
}