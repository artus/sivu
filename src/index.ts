import { Page } from "./pagination/Page";
import { QueryOptions } from "./query/QueryOptions";
import { Ordering } from './query/Ordering';

const page = new Page(["test"], 1, 12, 30);

console.log(JSON.stringify(page));

export {
  QueryOptions,
  Page,
  Ordering
}