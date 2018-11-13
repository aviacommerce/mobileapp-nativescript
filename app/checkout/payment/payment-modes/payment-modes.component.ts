import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, Subscription } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { getOrderNumber, getTotalCartValue, getTotalCartItems, getShipAddress, getShipTotal, getItemTotal, getAdjustmentTotal } from "~/checkout/reducers/selectors";
import { PaymentMode } from "~/core/models/payment_mode";
import { CheckoutService } from "~/core/services/checkout.service";
import { PaymentService } from "~/core/services/payment.service";
import { IappState } from "~/reducers";
import { Address } from '~/core/models/address';
import { environment } from '~/environments/environment';

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
    private checkoutService: CheckoutService,
    private store: Store<IappState>,
    private checkoutAction: CheckoutActions) {
  }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getAuthStatus).subscribe((auth) => this.isAuthenticated = auth),
      this.store.select(getOrderNumber).subscribe((oNumber) => this.orderNumber = oNumber),
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

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

  proceedOrderCOD() {
    this.subscriptionList$.push(
      this.checkoutService.createNewPayment(3, this.orderAmount).pipe(
        concatMap((_) => {
          return this.checkoutService.changeOrderState().pipe(
            map((x) => {
              this.store.dispatch(this.checkoutAction.orderCompleteSuccess());
              localStorage.removeItem("order");
              this.redirectToNewPage();
            })
          );
        })
      ).subscribe()
    );
  }

  redirectToNewPage() {
    if (this.isAuthenticated) {
      this.router.navigate(["checkout", "order"],
        { queryParams: { orderReferance: this.orderNumber } });
    } else {
      this.router.navigate(["/"]);
    }
  }
}
