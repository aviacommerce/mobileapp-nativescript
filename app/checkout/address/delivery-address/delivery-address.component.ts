import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import {
  getAdjustmentTotal, getItemTotal,
  getOrderState, getShipTotal,
  getTotalCartItems, getTotalCartValue
} from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { CheckoutService } from "~/core/services/checkout.service";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "delivery-address",
  templateUrl: "./delivery-address.component.html",
  styleUrls: ["./delivery-address.component.scss"]
})

export class DeliveryAddressComponent implements OnInit, OnDestroy {
  @Input() address: Address;
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  itemTotal$: Observable<number>;
  shipTotal$: Observable<number>;
  adjustmentTotal$: Observable<number>;
  currency = environment.config.currencySymbol;
  freeShippingAmount = environment.config.freeShippingAmount;
  orderState: string;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private store: Store<IappState>,
    private router: Router,
    private checkoutService: CheckoutService,
    private page: Page) { }

  ngOnInit() {

    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.shipTotal$ = this.store.select(getShipTotal);
    this.itemTotal$ = this.store.select(getItemTotal);
    this.adjustmentTotal$ = this.store.select(getAdjustmentTotal);

    this.subscriptionList$.push(
      this.store.select(getOrderState).subscribe((state) => this.orderState = state)
    );

    if (this.orderState === "address") {
      this.subscriptionList$.push(
        this.checkoutService.changeOrderState().subscribe()
      );
    }
  }

  checkoutToPayment() {
    if (this.orderState === "delivery" || this.orderState === "address") {
      this.subscriptionList$.push(
        this.checkoutService.changeOrderState().pipe(
          tap(() => {
            this.router.navigate(["/checkout", "payment"]);
          }))
          .subscribe()
      );
    } else {
      this.router.navigate(["/checkout", "payment"]);
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

}
