import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { getItemTotal, getOrderState, getTotalCartItems, getTotalCartValue } from "~/checkout/reducers/selectors";
import { CheckoutService } from "~/core/services/checkout.service";
import { environment } from "~/environments/environment";
@Component({
  selector: "Cart",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})

export class CartComponent implements OnInit, OnDestroy {
  totalCartItems: number;
  totalCartValue$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal: number;
  currency = environment.config.currencySymbol;
  isAuthenticated: boolean;
  orderState: string;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private router: RouterExtensions,
    private store: Store<IappState>,
    private checkoutService: CheckoutService,
    private page: Page) { }

  ngOnInit() {

    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.totalCartValue$ = this.store.select(getTotalCartValue);

    this.subscriptionList$.push(
      this.store.select(getItemTotal)
        .subscribe((itemsTotal) => this.itemTotal = itemsTotal),

      this.store.select(getOrderState)
        .subscribe((state) => this.orderState = state),

      this.store.select(getAuthStatus)
        .subscribe((authStatus) => this.isAuthenticated = authStatus),

      this.store.select(getTotalCartItems)
        .subscribe((cartItems) => this.totalCartItems = cartItems)
    );
  }

  checkoutToAddress() {
    if (this.isAuthenticated) {
      if (this.orderState === "cart") {
        this.subscriptionList$.push(
          this.checkoutService.changeOrderState().pipe(
            tap(() => {
              this.router.navigate(["/checkout", "address"]);
            })).subscribe());
      } else {
        this.router.navigate(["/checkout", "address"]);
      }
    } else {
      this.router.navigate(["/auth", "login"]);
    }
  }

  goToHome() {
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
