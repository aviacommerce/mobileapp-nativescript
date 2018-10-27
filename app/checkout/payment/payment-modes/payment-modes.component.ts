import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { getOrderNumber, getTotalCartValue } from "~/checkout/reducers/selectors";
import { PaymentMode } from "~/core/models/payment_mode";
import { CheckoutService } from "~/core/services/checkout.service";
import { PaymentService } from "~/core/services/payment.service";
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
