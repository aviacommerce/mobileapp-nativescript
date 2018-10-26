import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { getItemTotal, getOrderState, getTotalCartItems, getTotalCartValue } from "~/checkout/reducers/selectors";
import { CheckoutService } from "~/core/services/checkout.service";
import { environment } from "~/environments/environment";
import { IappState } from "~/reducers";
@Component({
  selector: "Cart",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})

export class CartComponent implements OnInit, OnDestroy {
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal$: Observable<number>;
  currency = environment.currency_symbol;
  isAuthenticated: boolean;
  orderState: string;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private router: RouterExtensions,
    private store: Store<IappState>,
    private checkoutService: CheckoutService,
    private router1: Router) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.itemTotal$ = this.store.select(getItemTotal);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getOrderState)
        .subscribe((state) => this.orderState = state),

      this.store.select(getAuthStatus).
        subscribe((authStatus) => {
          this.isAuthenticated = authStatus;
        })
    );
  }

  placeOrder() {
    if (this.isAuthenticated) {
      if (this.orderState === "cart") {
        this.subscriptionList$.push(
          this.checkoutService.changeOrderState().pipe(
            tap(() => {
              this.router.navigate(["/checkout", "address"]);
            })).subscribe());
      } else {
        this.router1.navigate(["/checkout", "address"]);
      }
    } else {
      this.router1.navigate(["/auth", "login"]);
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

  onBack() {
    this.router.backToPreviousPage();
  }
  gotoodersuccess() {
    this.router.navigate(["/checkout/order"]);
  }
}
