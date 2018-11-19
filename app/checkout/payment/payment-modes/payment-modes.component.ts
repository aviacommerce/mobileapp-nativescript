import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, Subscription } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import {
  getAdjustmentTotal, getItemTotal,
  getOrderNumber, getShipAddress, getShipTotal,
  getTotalCartItems, getTotalCartValue
} from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { PaymentMode } from "~/core/models/payment_mode";
import { CheckoutService } from "~/core/services/checkout.service";
import { PaymentService } from "~/core/services/payment.service";
import { environment } from "~/environments/environment";
import { IappState } from "~/reducers";

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
  address$: Observable<Address>;
  orderNumber$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal$: Observable<number>;
  adjustmentTotal$: Observable<number>;
  currency = environment.currency_symbol;
  orderSub$: Subscription;
  shipAddress$: Observable<Address>;
  freeShippingAmount = environment.freeShippingAmount;

  constructor(
    private router: RouterExtensions,
    private ro: Router,
    private checkoutService: CheckoutService,
    private store: Store<IappState>,
    private checkoutAction: CheckoutActions,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getAuthStatus).subscribe((auth) => this.isAuthenticated = auth),
      this.store.select(getTotalCartValue).subscribe((oAmount) => this.orderAmount = oAmount)
    );
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.address$ = this.store.select(getShipAddress);
    this.orderNumber$ = this.store.select(getOrderNumber);
    this.shipTotal$ = this.store.select(getShipTotal);
    this.itemTotal$ = this.store.select(getItemTotal);
    this.adjustmentTotal$ = this.store.select(getAdjustmentTotal);
    this.shipAddress$ = this.store.select(getShipAddress);
  }

  onBack() {
    this.router.backToPreviousPage();
  }

  makeCodPayment() {
    this.proceedOrderCOD();
  }

  proceedOrderCOD() {
    // TODO: Payment mode is hardcoded.
    this.subscriptionList$.push(
      this.checkoutService.createNewPayment(3, this.orderAmount).pipe(
        concatMap((_) => {
          return this.checkoutService.changeOrderState().pipe(
            map(() => {
              const orderInfo = isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem("order")) : null;
              this.store.dispatch(this.checkoutAction.orderCompleteSuccess());
              localStorage.removeItem("order");
              this.redirectToNewPage(orderInfo.order_number);
            })
          );
        })
      ).subscribe()
    );
  }

  redirectToNewPage(orderNumber: string) {
    if (this.isAuthenticated) {
      this.ro.navigate(["checkout/order/", orderNumber]);
    } else {
      this.router.navigate(["/"]);
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
