import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getOrderState, getShipAddress } from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { AddressService } from "~/core/services/address.service";
import { CheckoutService } from "~/core/services/checkout.service";
import { SharedService } from "~/core/services/shared.service";

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
    private store: Store<IappState>,
    private sharedService: SharedService,
    private page: Page) {
    // this.address = new Address();
    // for demo purpose
    this.address = {
      firstname: "Test",
      lastname: "Arina",
      city: "Pune",
      address2: "Hadapsar",
      address1: "319, Amnora",
      zipcode: "411028",
      phone: "1234567890",
      state_name: "Maharashtra",
      country_id: 105,
      state_id: 1137
    };
  }

  ngOnInit() {

    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.subscriptionList$.push(
      this.store.select(getOrderState)
        .subscribe((oState) => this.orderState = oState),
      this.store.select(getShipAddress).subscribe((ship) => this.shipAddress = ship)
    );
  }

  saveAddress() {
    let addressAttributes;
    addressAttributes = this.addressService.createAddresAttributes(this.address);
    this.subscriptionList$.push(
      this.checkoutService.updateOrder(addressAttributes)
        .subscribe((_) => {
          this.sharedService.successMessage("Address Saved Successfully!");
        }, (error) => {
          const errorMsg = error.error.error || "Unable to save address";
          this.sharedService.successMessage(errorMsg);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
