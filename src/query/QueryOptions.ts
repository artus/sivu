import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
import { NumberValidator } from "../validation/NumberValidator";
import { ObjectValidator } from "../validation/ObjectValidator";
import { Ordering } from "./Ordering";

export class QueryOptions {

  readonly pageNumber: number;
  readonly pageSize: number;
  readonly order: Ordering;
  readonly sortBy: string;

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