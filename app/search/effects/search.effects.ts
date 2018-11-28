import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { ProductService } from "~/core/services/product.service";
import { SearchActions } from "../action/search.actions";

@Injectable()
export class SearchEffects {

  @Effect()
  getProductsByKeyword$ = this.actions$.ofType(SearchActions.GET_PRODUCTS_BY_KEYWORD).pipe(
    switchMap<Action & { payload }, { products, pagination }>((action) => {
      return this.productService.getProductsByKeyword(action.payload);
    }),
    map(({ products, pagination }) => this.searchActions.getSearchedProducts({ products, pagination }))
  );

  @Effect()
  getProductsByTaxons$ = this.actions$.ofType(SearchActions.GET_PRODUCTS_BY_TAXON).pipe(
    switchMap<Action & { payload }, { products, pagination }>((action) => {
      return this.productService.getProductsByTaxon(action.payload);
    }),
    map(({ products, pagination }) => this.searchActions.getSearchedProducts({ products, pagination }))
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private searchActions: SearchActions) { }
}
