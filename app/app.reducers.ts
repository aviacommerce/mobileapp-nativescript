import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "~/auth/reducers/auth.reducers";
import { AuthState } from "~/auth/reducers/auth.state";
import * as fromCheckout from "~/checkout/reducers/checkout.reducer";
import { CheckoutState } from "~/checkout/reducers/checkout.state";
import * as fromProduct from "~/product/reducers/product-reducer";
import { ProductState } from "~/product/reducers/product-state";
import * as fromSearch from "~/search/reducers/search.reducers";
import { IsearchState } from "~/search/reducers/search.state";

export interface IappState {
  products: ProductState;
  search: IsearchState;
  checkout: CheckoutState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<IappState> = {
  products: fromProduct.reducer,
  search: fromSearch.reducer,
  checkout: fromCheckout.reducer,
  auth: fromAuth.reducer
};
