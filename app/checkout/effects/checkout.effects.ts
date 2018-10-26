import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { CheckoutService } from "../../core/services/checkout.service";
import { LineItem } from "./../../core/models/line_item";
import { CheckoutActions } from "./../actions/checkout.actions";

@Injectable()
export class CheckoutEffects {
  @Effect()
  addToCart$ = this.actions$
    .ofType(CheckoutActions.ADD_TO_CART).pipe(
      switchMap<Action & { payload: { variant_id: number, quantity: number } }, LineItem>((action) => {

        return this.checkoutService.createNewLineItem(
          action.payload.variant_id,
          action.payload.quantity
        );
      }),
      map((lineItem) => this.actions.addToCartSuccess(lineItem))
    );

  @Effect()
  removeLineItem$ = this.actions$
    .ofType(CheckoutActions.REMOVE_LINE_ITEM)
    .pipe(
      switchMap<Action & { payload: LineItem }, LineItem>((action) => {
        return this.checkoutService.deleteLineItem(action.payload);
      }),
      map((lineItem) => this.actions.removeLineItemSuccess(lineItem))
    );

  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService,
    private actions: CheckoutActions
  ) { }
}
