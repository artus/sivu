import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
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
   * @param {string} [sortBy=''] - The field(s) that should be sorted by.
   */
  constructor(
    pageNumber: number,
    pageSize: number,
    order: Ordering = Ordering.ASCENDING,
    sortBy = ''
  ) {
    this.pageNumber = NumberValidator.checkNotNegative(pageNumber, CAN_NOT_BE_NEGATIVE('Page number'));
    this.pageSize = NumberValidator.checkNotNegative(pageSize, CAN_NOT_BE_NEGATIVE('Page size'));
    this.order = ObjectValidator.checkNotNull(order, CAN_NOT_BE_NULL('Order'));
    this.sortBy = sortBy;
  }

  /**
   * Stringify this QueryOptions so that it can be used in a URL.
   * 
   * @param {boolean} [includePrefix=true] - Whether the '?' prefix should be included or not.
   * @returns {string} The serialized version of these QueryOptions that can be used in a URL. e.g. '?pageNumber=1&pageSize=15&order=asc&sortBy=name'.
   */
  public getQueryString(includePrefix = true) : string {
    let queryString = `pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&order=${this.order}`;

    if (this.sortBy) {
      queryString = `${queryString}&sort=${this.sortBy}`;
    }

    if (includePrefix) {
      queryString = `?${queryString}`;
    }

    return queryString;
  }
}