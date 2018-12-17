
import { Product } from "~/core/models/product";
import { SearchActions } from "../action/search.actions";
import { IsearchState, searchStateRecord } from "./search.state";

export const initialState: IsearchState = new searchStateRecord() as IsearchState;

export function reducer(state = initialState, { type, payload }: any): IsearchState {
  switch (type) {

    case SearchActions.GET_SEARCHED_PRODUCTS:

      const _searchedProducts: Array<Product> = payload.products;
      const _paginationData = payload.pagination;
      let _productsLoader: boolean;
      if (payload.products.lenght) {
        _productsLoader = true;
      }

      return state.merge({
        searchedProducts: _searchedProducts,
        paginationData: _paginationData,
        productsLoader: _productsLoader
      }) as IsearchState;

    case SearchActions.CLEAR_PRODUCTS:
      return state.merge({
        searchedProducts: [],
        productsLoader: payload,
        paginationData: {}
      }) as IsearchState;

      case SearchActions.RESET_LOADER:
      return state.merge({
        productsLoader: payload
      }) as IsearchState;

    default:
      return state;
  }
}
