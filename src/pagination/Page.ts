import { CAN_NOT_BE_NEGATIVE, CAN_NOT_BE_NULL } from "../ErrorMessages";
import { NumberValidator } from "../validation/NumberValidator";
import { ObjectValidator } from "../validation/ObjectValidator";

export class Page<T> {

  readonly values: T[];
  readonly pageNumber: number;
  readonly totalPages: number;
  readonly totalSize: number;

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

  public get size(): number {
    return this.values.length;
  }
}