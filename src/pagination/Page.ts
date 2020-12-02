import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
import { NumberValidator } from "../validation/NumberValidator";
import { ObjectValidator } from "../validation/ObjectValidator";

export class Page<T> {

  /**
   * The values embedded in this Page.
   */
  readonly values: T[];

  /**
   * The page number.
   */
  readonly pageNumber: number;

  /**
   * The total amount of pages.
   */
  readonly totalPages: number;

  /**
   * The total amount of results of the query that this Page is a part of.
   */
  readonly totalSize: number;

  /**
   * @constructor Create a new Page object.
   * @classdesc A Page is an object that contains a page of a query result.
   * 
   * @param {T} values - The results embedded in this page.
   * @param {number} pageNumber - The page number.
   * @param {number} totalPages - The total amount of pages of the query that this Page is a part of.
   * @param {number} totalSize - The total amount of results of the query that this Page is a part of.
   */
  constructor(
    values: T[],
    pageNumber: number,
    totalPages: number,
    totalSize: number
  ) {
    this.values = ObjectValidator.checkNotNull(values, CAN_NOT_BE_NULL('Values'));
    this.pageNumber = NumberValidator.checkNotNegative(pageNumber, CAN_NOT_BE_NEGATIVE('Page number'));
    this.totalPages = NumberValidator.checkNotNegative(totalPages, CAN_NOT_BE_NEGATIVE('Total amount of pages'));
    this.totalSize = NumberValidator.checkNotNegative(totalSize, CAN_NOT_BE_NEGATIVE('Total size'));
  }

  /**
   * The amount of results in this Page.
   */
  public get size(): number {
    return this.values.length;
  }
}