import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { getOrderState, getShipAddress } from "~/checkout/reducers/selectors";
import { AddressService } from "~/core/services/address.service";
import { CheckoutService } from "~/core/services/checkout.service";
import { IappState } from "~/reducers";
import { Address } from '~/core/models/address';

@Component({
  moduleId: module.id,
  selector: "add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.scss"]
})

export class AddAddressComponent implements OnInit, OnDestroy {

  address: any;
  orderState: string;
  shipAddress: Address;
  subscriptionList$: Array<Subscription> = [];
  constructor(
    private router: RouterExtensions,
    private addressService: AddressService,
    private checkoutService: CheckoutService,
    private store: Store<IappState>) {
    // this.address = new Address();
    // for demo purpose
    this.address = {
      firstname: "Gopal",
      lastname: "Shimpi",
      city: "Pune",
      address2: "Hadapsar",
      address1: "319, Amnora",
      zipcode: "411028",
      phone: "9029370273",
      state_name: "Maharashtra",
      country_id: 105,
      state_id: 1137
    };
  }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getOrderState)
        .subscribe((oState) => this.orderState = oState),

      this.store.select(getShipAddress).subscribe((ship) => this.shipAddress = ship)
    );

  }

  onBack() {
    this.router.backToPreviousPage();
  }

  saveAddress() {
      let addressAttributes;
      addressAttributes = this.addressService.createAddresAttributes(this.address);
      this.subscriptionList$.push(
        this.checkoutService.updateOrder(addressAttributes)
          .subscribe((_) => this.checkoutToPayment())
      );
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
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
