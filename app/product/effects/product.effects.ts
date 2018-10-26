import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { SearchActions } from "~/search/action/search.actions";
import { Product } from "./../../core/models/product";
import { ProductService } from "./../../core/services/product.service";
import { ProductActions } from "./../actions/product-actions";

@Injectable()
export class ProductEffects {

  @Effect()
  getAllProducts$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_ALL_PRODUCTS)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProducts(action.payload)
      ),
      map((data: any) => {
        return this.productActions.getAllProductsSuccess({ products: data });
      }
      )
    );

  @Effect()
  getProductDetail$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_PRODUCT_DETAIL)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProduct(action.payload)
      ),
      map((product: Product) =>
        this.productActions.getProductDetailSuccess({ product })
      )
    );

  @Effect()
  getAllTaxonomies$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_ALL_TAXONOMIES)
    .pipe(
      switchMap((action: any) => this.productService.getTaxonomies()),
      map((data: any) =>
        this.productActions.getAllTaxonomiesSuccess({ taxonomies: data })
      )
    );

  @Effect()
    getProductsByTaxons$: Observable<Action> = this.actions$
      .ofType(SearchActions.GET_PRODUCTS_BY_TAXON)
      .pipe(
        switchMap((action: any) =>
          this.productService.getProductsByTaxon(action.payload)
        ),
        map(({ products, pagination }) =>
          this.searchActions.getProductsByKeywordSuccess({ products, pagination })
        )
      );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productActions: ProductActions,
    private searchActions: SearchActions

  ) { }
}
