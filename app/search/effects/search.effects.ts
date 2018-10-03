import { map, switchMap } from 'rxjs/operators';
import { Product } from '~/core/models/product';
import { SearchActions } from '../action/search.actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ProductService } from '~/core/services/product.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private searchActions: SearchActions,

  ) { }

  @Effect()
  GetProductsByKeyword$: Observable<Action> = this.actions$
    .ofType(SearchActions.GET_PRODUCTS_BY_KEYWORD)
    .pipe(
      switchMap((action: any) =>
        this.productService.getproductsByKeyword(action.payload)
      ),
      map(({ products, pagination }) =>
        this.searchActions.getProductsByKeywordSuccess({ products, pagination })
      )
    );
}
