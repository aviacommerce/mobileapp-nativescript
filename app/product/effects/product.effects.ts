import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { Taxonomy } from "~/core/models/taxonomy";
import { Product } from "./../../core/models/product";
import { ProductService } from "./../../core/services/product.service";
import { ProductActions } from "./../actions/product-actions";

@Injectable()
export class ProductEffects {

  @Effect()
  getProductDetail$ = this.actions$.ofType(ProductActions.GET_PRODUCT_DETAIL).pipe(
    switchMap<Action & { payload: string }, Product>((action) => {
      return this.productService.getProduct(action.payload);
    }),
    map((data: Product) => this.productActions.getProductDetailSuccess({ product: data }))
  );

  @Effect()
  getAllTaxonomies$ = this.actions$.ofType(ProductActions.GET_ALL_TAXONOMIES).pipe(
    switchMap<Action, Array<Taxonomy>>((_) => {
      return this.productService.getTaxonomies();
    }),
    map((data) => this.productActions.getAllTaxonomiesSuccess({ taxonomies: data }))
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productActions: ProductActions
  ) { }
}
