import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, Subscription } from "rxjs";
import { concatMap, map, switchMap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import {
  getAdjustmentTotal, getItemTotal,
  getOrderNumber, getOrderState, getShipAddress,
  getShipTotal, getTotalCartItems, getTotalCartValue
} from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { CheckoutService } from "~/core/services/checkout.service";
import { SharedService } from "~/core/services/shared.service";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "payment-modes",
  templateUrl: "./payment-modes.component.html",
  styleUrls: ["./payment-modes.component.scss"]
})

export class PaymentModesComponent implements OnInit, OnDestroy {

  subscriptionList$: Array<Subscription> = [];
  orderAmount: number;
  orderNumber: number;
  isAuthenticated: boolean;
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  orderNumber$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal$: Observable<number>;
  adjustmentTotal$: Observable<number>;
  currency = environment.config.currencySymbol;
  orderSub$: Subscription;
  freeShippingAmount = environment.config.freeShippingAmount;
  isProcessing: boolean;
  orderState: string;

  constructor(
    private router: RouterExtensions,
    private checkoutService: CheckoutService,
    private store: Store<IappState>,
    private checkoutAction: CheckoutActions,
    private sharedService: SharedService,
    private page: Page) {
  }

  ngOnInit() {
    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.subscriptionList$.push(
      this.store.select(getAuthStatus).subscribe((auth) => this.isAuthenticated = auth),
      this.store.select(getTotalCartValue).subscribe((oAmount) => this.orderAmount = oAmount),
      this.store.select(getOrderState).subscribe((state) => this.orderState = state)
    );

    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.orderNumber$ = this.store.select(getOrderNumber);
    this.shipTotal$ = this.store.select(getShipTotal);
    this.itemTotal$ = this.store.select(getItemTotal);
    this.adjustmentTotal$ = this.store.select(getAdjustmentTotal);
  }

  makeCodPayment() {
    // TODO: Payment mode is hardcoded.
    if (this.orderState === "payment") {
      this.isProcessing = true;
      this.subscriptionList$.push(
        this.checkoutService.createNewPayment(3, this.orderAmount).pipe(
          concatMap((_) => {
            return this.checkoutService.changeOrderState().pipe(
              map(() => this.orderComplete())
            );
          })
        ).subscribe()
      );
    } else {
      this.sharedService.infoMessage("Error occured try again!");
      this.router.navigate(["/"]);
    }
  }

  orderComplete() {
    const orderInfo = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : null;
    this.store.dispatch(this.checkoutAction.orderCompleteSuccess());
    localStorage.removeItem("order");
    this.isProcessing = false;
    this.sharedService.successMessage("Your order has been placed.");
    this.redirectToNewPage(orderInfo.order_number);
  }

  redirectToNewPage(orderNumber: string) {
    if (this.isAuthenticated) {
      this.router.navigate(["checkout/order/", orderNumber]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
