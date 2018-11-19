
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
  shipAddress: Address;
  editAddress: boolean;
  addressData: Address;
  temp: Address;

  constructor(
    private store: Store<IappState>,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit() {
    this.orderNumber$ = this.store.select(getOrderNumber);
    this.store.select(getShipAddress).subscribe((address: Address) => this.shipAddress = address);
    this.stateSub$ = this.store.select(getOrderState)
      .subscribe((state) => this.orderState = state);
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
