import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { Tutorial } from '../featured/models/tutorial.model';
import { reducer } from '../featured/reducer/tutorial.reducer';
import { ProductState } from '~/product/reducers/product-state';
import * as fromProduct from '~/product/reducers/product-reducer';
export interface State {
  readonly tutorial: Tutorial[],
  products: ProductState
}

export const reducers: ActionReducerMap<State> = {
  tutorial: reducer,
  products: fromProduct.reducer,
};
