import { map, switchMap } from 'rxjs/operators';

import { Product } from './../../core/models/product';
import { ProductActions } from './../actions/product-actions';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { ProductService } from './../../core/services/product.service';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productActions: ProductActions,
  
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect()
  GetAllProducts$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_ALL_PRODUCTS)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProducts(action.payload)
      ),
      map((data: any) =>
        this.productActions.getAllProductsSuccess({ products: data })
      )
    );

  // tslint:disable-next-line:member-ordering


  // tslint:disable-next-line:member-ordering
  @Effect()
  GetProductDetail$: Observable<Action> = this.actions$
    .ofType(ProductActions.GET_PRODUCT_DETAIL)
    .pipe(
      switchMap((action: any) =>
        this.productService.getProduct(action.payload)
      ),
      map((product: Product) =>
        this.productActions.getProductDetailSuccess({ product })
      )
    );









}
