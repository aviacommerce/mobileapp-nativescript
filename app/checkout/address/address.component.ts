
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { IappState } from "~/reducers";
import { Address } from "./../../core/models/address";
import { CheckoutService } from "./../../core/services/checkout.service";
import { getOrderNumber, getOrderState, getShipAddress } from "./../reducers/selectors";

@Component({
  selector: "Address",
  moduleId: module.id,
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit, OnDestroy {

  stateSub$: Subscription;
  orderState: string;
  orderNumber$: Observable<number>;
  shipAddress$: Observable<Address>;
  editAddress: boolean;
  addressData: Address;

  constructor(
    private store: Store<IappState>,
    private checkoutService: CheckoutService,
    private router: Router) {
    this.orderNumber$ = this.store.select(getOrderNumber);
    this.shipAddress$ = this.store.select(getShipAddress);
    this.stateSub$ = this.store.select(getOrderState)
      .subscribe((state) => this.orderState = state);
  }

  ngOnInit() {//
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

  ngOnDestroy() {
    this.stateSub$.unsubscribe();
  }
}
