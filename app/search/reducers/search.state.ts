
import { List, Map, Record } from "immutable";
import { Product } from "~/core/models/product";

export interface IsearchState extends Map<string, any> {
  searchedProducts: List<Product>;
  taxonomiByName: List<any>;
  paginationData: Map<string, any>;
  productsLoader: boolean;

}

export const searchStateRecord = Record({
  searchedProducts: List([]),
  taxonomiByName: List([]),
  paginationData: Map({}),
  productsLoader: false
});
