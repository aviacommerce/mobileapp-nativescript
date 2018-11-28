
import { createSelector } from "@ngrx/store";
import { IappState } from "~/app.reducers";
import { IsearchState } from "./search.state";

/******************* Base Search State ******************/
export function getSearchState(state: IappState): IsearchState {
  return state.search;
}
/******************* Individual selectors ******************/

function fetchSearchedProducts(state: IsearchState) {
  return state.searchedProducts.toJS();
}

function fetchTaxonomiByName(state: IsearchState) {
  return state.taxonomiByName.toJS();
}

function fetchPaginationData(state: IsearchState) {
  return state.paginationData.toJS();
}

function fetchProductsLoader(state: IsearchState) {
  return state.productsLoader;
}

/******************* Public Selector API's ******************/
export const getSearchedProducts = createSelector(getSearchState, fetchSearchedProducts);
export const getPaginationData = createSelector(getSearchState, fetchPaginationData);
export const taxonomiByName = createSelector(getSearchState, fetchTaxonomiByName);
export const getProductsLoader = createSelector(getSearchState, fetchProductsLoader);
