import { start } from "repl";
import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
import { QueryOptions } from "../query/QueryOptions";
import { NumberValidator } from "../validation/NumberValidator";
import { ObjectValidator } from "../validation/ObjectValidator";

export class Page<T> {

  /**
   * The values embedded in this Page.
   */
  readonly values: T[];

  /**
   * The total amount of pages.
   */
  readonly totalPages: number;

  /**
   * The total amount of results of the query that this Page is a part of.
   */
  readonly totalSize: number;

  /**
   * The query that generated these results.
   */
  readonly queryOptions: QueryOptions;

  /**
   * @constructor Create a new Page object.
   * @classdesc A Page is an object that contains a page of a query result.
   * 
   * @param {T} values - The results embedded in this page.
   * @param {number} totalPages - The total amount of pages of the query that this Page is a part of.
   * @param {number} totalSize - The total amount of results of the query that this Page is a part of.
   * @param {QueryOptions} queryOptions - The query that generated these results.
   */
  constructor(
    values: T[],
    totalPages: number,
    totalSize: number,
    queryOptions: QueryOptions
  ) {
    this.values = ObjectValidator.checkNotNull(values, CAN_NOT_BE_NULL('Values'));
    this.totalPages = NumberValidator.checkNotNegative(totalPages, CAN_NOT_BE_NEGATIVE('Total amount of pages'));
    this.totalSize = NumberValidator.checkNotNegative(totalSize, CAN_NOT_BE_NEGATIVE('Total size'));
    this.queryOptions = ObjectValidator.checkNotNull(queryOptions, CAN_NOT_BE_NULL('Query options'));
  }

  /**
   * The amount of results in this Page.
   */
  public get size(): number {
    return this.values.length;
  }

  /**
   * The current page number.
   */
  public get pageNumber(): number {
    return this.queryOptions.pageNumber;
  }

  /**
   * Check whether this is the last page.
   */
  public isLastPage(): boolean {
    return this.pageNumber === this.totalPages
  }

  /**
   * Check whether this is the first page, e.g. page 1.
   */
  public isFirstPage(): boolean {
      return this.pageNumber === 1;
  }

  public queryNextPage(): QueryOptions {
    return this.isLastPage()
      ? this.queryOptions
      : this.queryOptions.next();
  }

  public queryPreviousPage(): QueryOptions {
    return this.isFirstPage()
      ? this.queryOptions
      : this.queryOptions.previous();
  }
}