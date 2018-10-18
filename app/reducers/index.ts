import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { ProductState } from '~/product/reducers/product-state';
import * as fromProduct from '~/product/reducers/product-reducer';
import { SearchState } from '~/home/reducers/search.state';
import * as fromSearch from '~/home/reducers/search.reducers';
import { HomeState } from '~/home/reducers';
import { CheckoutState } from '../checkout/reducers/checkout.state';
import * as fromCheckout from '../checkout/reducers/checkout.reducer';

export interface State {

  products: ProductState,
  search: SearchState
  checkout: CheckoutState;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProduct.reducer,
  search: fromSearch.reducer,
  checkout: fromCheckout.reducer,
};
