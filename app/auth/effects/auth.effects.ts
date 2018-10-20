import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { CheckoutService } from "~/core/services/checkout.service";
import { AuthService } from "../../core/services/auth.service";
import { AuthActions } from "../actions/auth.actions";
import { User } from "./../../core/models/user";

@Injectable()
export class AuthenticationEffects {

  @Effect()
  authorized$: Observable<Action> = this.actions$
    .ofType(AuthActions.AUTHORIZE)
    .pipe(
      switchMap<Action, { status: string } & User>(() => {
        return this.authService.authorized();
      }),
      switchMap((data) => this.checkoutService.fetchCurrentOrder().pipe(map(() => data))),
      map((data) => {
        if (data.status === "unauthorized") {
          return this.authActions.noOp();
        } else {
          return this.authActions.loginSuccess();
        }
      })
    );

  @Effect()
  afterLoginSuccess$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN_SUCCESS)
    .pipe(
      switchMap(() => {
        return this.checkoutService.fetchCurrentOrder();
      }),
      map((_) => this.authActions.noOp())
    );

  @Effect()
  afterLogoutSuccess$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGOUT_SUCCESS)
    .pipe(
      map((_) => this.checkoutActions.orderCompleteSuccess())
    );

  constructor(
    private actions$: Actions,
    private checkoutActions: CheckoutActions,
    private authService: AuthService,
    private authActions: AuthActions,
    private checkoutService: CheckoutService
  ) { }
}
