import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import {
  getAdjustmentTotal, getItemTotal,
  getOrderState, getShipTotal,
  getTotalCartItems, getTotalCartValue
} from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { CheckoutService } from "~/core/services/checkout.service";
import { environment } from "~/environments/environment";
import { IappState } from "~/home/reducers";

@Component({
  moduleId: module.id,
  selector: "delivery-address",
  templateUrl: "./delivery-address.component.html",
  styleUrls: ["./delivery-address.component.scss"]
})

export class DeliveryAddressComponent implements OnInit {
  @Input() address: Address;
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  itemTotal$: Observable<number>;
  shipTotal$: Observable<number>;
  adjustmentTotal$: Observable<number>;
  currency = environment.currency_symbol;
  freeShippingAmount = environment.freeShippingAmount;
  orderState: string;

  constructor(
    private store: Store<IappState>,
    private router: Router,
    private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.shipTotal$ = this.store.select(getShipTotal);
    this.itemTotal$ = this.store.select(getItemTotal);
    this.adjustmentTotal$ = this.store.select(getAdjustmentTotal);
    this.store.select(getOrderState).subscribe((state) => this.orderState = state);
  }

  checkoutToPayment() {
    if (this.orderState === "delivery" || this.orderState === "address") {
      this.checkoutService.changeOrderState().pipe(
        tap(() => {
          this.router.navigate(["/checkout", "payment"]);
        }))
        .subscribe();
    } else {
      this.router.navigate(["/checkout", "payment"]);
    }
  }

}
