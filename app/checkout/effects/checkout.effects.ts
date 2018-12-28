import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { CState } from "~/core/models/state";
import { SharedService } from "~/core/services/shared.service";
import { CheckoutService } from "../../core/services/checkout.service";
import { LineItem } from "./../../core/models/line_item";
import { CheckoutActions } from "./../actions/checkout.actions";

@Injectable()
export class CheckoutEffects {

  @Effect()
  addToCart$ = this.actions$.ofType(CheckoutActions.ADD_TO_CART).pipe(
    switchMap<Action & { payload: { variantId: number, quantity: number } }, LineItem>((action) => {
      return this.checkoutService.createNewLineItem(
        action.payload.variantId,
        action.payload.quantity
      );
    }),
    map((lineItem) => {
      this.sharedService.successMessage("Cart updated!");

      return this.actions.addToCartSuccess(lineItem);
    }, (error) => { this.sharedService.successMessage("Something went wrong[Cart]"); })
  );

  // Todo: Refactor this.
  @Effect()
  removeLineItem$ = this.actions$.ofType(CheckoutActions.REMOVE_LINE_ITEM).pipe(
    switchMap<Action & { payload: LineItem }, LineItem>((action) => {
      return this.checkoutService.deleteLineItem(action.payload);
    }),
    map((lineItem) => {
      this.sharedService.infoMessage("Item deleted form cart!");

      return this.actions.removeLineItemSuccess(lineItem);
    })
  );

  @Effect()
  statesList$ = this.actions$.ofType(CheckoutActions.GET_STATES_LIST).pipe(
    switchMap<Action & { payload }, Array<CState>>((_) => {

      return this.checkoutService.getAllStates();
    }),
    map((states) => this.actions.getStatesListSuccess(states))
  );

  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService,
    private sharedService: SharedService,
    private actions: CheckoutActions
  ) { }
}
