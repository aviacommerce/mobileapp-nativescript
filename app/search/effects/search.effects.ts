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
        this.productService.getproductsByKeyword(action.payload)
      ),
      map(({ products, pagination }) =>
        this.searchActions.getProductsByKeywordSuccess({ products, pagination })
      )
    );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private searchActions: SearchActions

  ) { }
}
