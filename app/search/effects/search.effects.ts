import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { ProductService } from "~/core/services/product.service";
import { SearchActions } from "../action/search.actions";

@Injectable()
export class SearchEffects {

  @Effect()
  getProductsByKeyword$: Observable<Action> = this.actions$
    .ofType(SearchActions.GET_PRODUCTS_BY_KEYWORD)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProductsByKeyword(action.payload)
      ),
      map(({ products, pagination }) =>
        this.searchActions.getSearchedProducts({ products, pagination })
      )
    );

  @Effect()
  getProductsByTaxons$: Observable<Action> = this.actions$
    .ofType(SearchActions.GET_PRODUCTS_BY_TAXON)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProductsByTaxon(action.payload)
      ),
      map(({ products, pagination }) => this.searchActions.getSearchedProducts({ products, pagination }))
    );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private searchActions: SearchActions) { }
}
