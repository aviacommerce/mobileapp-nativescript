
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { Address } from "./../../core/models/address";
import { CheckoutService } from "./../../core/services/checkout.service";
import { getOrderNumber, getOrderState, getShipAddress } from "./../reducers/selectors";

@Component({
  selector: "Address",
  moduleId: module.id,
  templateUrl: "./order-respone.component.html",
  styleUrls: ["./order-respone.component.scss"]
})
export class OrderResponeComponent implements OnInit, OnDestroy {

  stateSub$: Subscription;
  orderState: string;
  orderNumber$: Observable<number>;
  shipAddress$: Observable<Address>;
  editAddress: boolean;
  addressData: Address;
  orders;
  subscriptionList$: Array<Subscription> = [];
  constructor(

    private checkoutService: CheckoutService,
    private router: Router) {

  }

  ngOnInit() {//
    this.subscriptionList$.push(
      this.checkoutService.getOrderDetail("R577631917")
        .subscribe((result) => {
          this.orders = (result);
        })
     );
  }



  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
