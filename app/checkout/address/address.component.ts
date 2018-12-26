
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
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
  isEditAddressPressed: boolean;
  addressData: Address;
  subscriptionList$: Array<Subscription> = [];
  isProcessing = true;

  constructor(
    private store: Store<IappState>,
    private checkoutService: CheckoutService,
    private router: Router,
    private page: Page) { }

  ngOnInit() {
    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.orderNumber$ = this.store.select(getOrderNumber);

    this.subscriptionList$.push(
      this.store.select(getShipAddress)
        .subscribe((address: Address) => {
          this.shipAddress = address;
          this.isProcessing = false;
        }),

      this.store.select(getOrderState)
        .subscribe((state) => this.orderState = state)
    );
  }

  checkoutToPayment() {
    if (this.orderState === "delivery" || this.orderState === "address") {
      this.subscriptionList$.push(
        this.checkoutService.changeOrderState().pipe(
          tap(() => {
            this.router.navigate(["/checkout", "payment"]);
          })
        ).subscribe()
      );
    } else {
      this.router.navigate(["/checkout", "payment"]);
    }
  }

  enableAddressEdit(address) {
    this.isEditAddressPressed = true;
  }

  isAddressEdited() {
    this.isEditAddressPressed = false;
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
