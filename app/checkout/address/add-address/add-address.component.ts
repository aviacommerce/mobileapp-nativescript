import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { AddressService } from "~/core/services/address.service";
import { CheckoutService } from "~/core/services/checkout.service";

@Component({
  moduleId: module.id,
  selector: "add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.scss"]
})

export class AddAddressComponent implements OnInit, OnDestroy {

  address: any;
  subscriptionList$: Array<Subscription> = [];
  constructor(
    private router: RouterExtensions,
    private addressService: AddressService,
    private checkoutService: CheckoutService) {
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
      state_id: 1144
    };
  }

  ngOnInit() {//
  }

  onBack() {
    this.router.backToPreviousPage();
  }

  saveAddress() {
    let addressAttributes;
    addressAttributes = this.addressService.createAddresAttributes(this.address);
    this.subscriptionList$.push(
      this.checkoutService.updateOrder(addressAttributes).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
