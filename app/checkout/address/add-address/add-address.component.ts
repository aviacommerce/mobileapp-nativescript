import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getOrderNumber, getOrderState, getShipAddress } from "~/checkout/reducers/selectors";
import { Address } from "~/core/models/address";
import { CState } from "~/core/models/state";
import { AddressService } from "~/core/services/address.service";
import { CheckoutService } from "~/core/services/checkout.service";
import { SharedService } from "~/core/services/shared.service";
import { StatesModalComponent } from "./states-modal/states-modal.component";

@Component({
  moduleId: module.id,
  selector: "add-address",
  templateUrl: "./add-address.component.html",
  styleUrls: ["./add-address.component.scss"]
})

export class AddAddressComponent implements OnInit, OnDestroy {

  @Input() isEditAddressPressed: boolean;
  @Output() isAddressEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  orderState: string;
  shipAddress: Address;
  subscriptionList$: Array<Subscription> = [];
  states: Array<CState> = [];
  addressForm: FormGroup;
  orderNumber: number;
  isProcessing: boolean;

  constructor(
    private router: RouterExtensions,
    private addressService: AddressService,
    private checkoutService: CheckoutService,
    private store: Store<IappState>,
    private sharedService: SharedService,
    private addrService: AddressService,
    private page: Page,
    private _vcRef: ViewContainerRef,
    private _modalService: ModalDialogService) {
    this.addressForm = this.addrService.initAddressForm();

  }

  ngOnInit() {
    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.subscriptionList$.push(
      this.addrService.getAllStates().subscribe((states) => this.states = states),
      this.store.select(getOrderState).subscribe((oState) => this.orderState = oState),
      this.store.select(getShipAddress).subscribe((ship) => this.shipAddress = ship),
      this.store.select(getOrderNumber).subscribe((oNumber) => this.orderNumber = oNumber)
    );

    if (this.shipAddress && this.isEditAddressPressed) {
      this.existingAddress(this.addressForm);
    }
  }

  saveAddress() {
    let address = this.addressForm.value;
    const keys = Object.keys(address);
    if (this.addressForm.valid) {
      this.isProcessing = true;
      address = this.buildAddress(address);
      if (this.isEditAddressPressed) {
        this.updateExistingAddress(address);
      } else {
        this.newAddress(address);
      }
    } else {
      keys.forEach((val) => {
        const ctrl = this.addressForm.controls[val];
        if (!ctrl.valid) {
          ctrl.markAsTouched();
        }
      });
      this.sharedService.errorMessage("Invalid data!");
    }
  }

  buildAddress(address) {
    for (const state of this.states) {
      if (state.name === address.state_name) {
        address.state_id = state.id;
        address.country_id = state.country_id;
        address.state_name = state.name;
        break;
      }
    }

    return address;
  }

  newAddress(address) {
    const addressAttributes = this.addressService.createAddresAttributes(address);
    this.subscriptionList$.push(
      this.checkoutService.updateOrder(addressAttributes)
        .subscribe((_) => {
          this.showEditedAddress();
          this.sharedService.successMessage("Address Saved Successfully!");
          this.isProcessing = false;
        }, (error) => {
          const errorMsg = error.error.error || "Unable to save address";
          this.sharedService.errorMessage(errorMsg);
        })
    );
  }

  updateExistingAddress(address) {
    this.subscriptionList$.push(
      this.addrService
        .updateAddress(address, this.shipAddress.id, this.orderNumber)
        .subscribe((_) => {
          this.isProcessing = false;
          this.showEditedAddress();
        })
    );
  }
  // modal for states
  onstate() {
    const options: ModalDialogOptions = {
      viewContainerRef: this._vcRef,
      context: "",
      fullscreen: false
    };

    this._modalService.showModal(StatesModalComponent, options).then((state: CState) => {
     this.addressForm.get("state_name").setValue(state.name);
    });
  }

  existingAddress(addressForm) {
    addressForm.get("zipcode").setValue(this.shipAddress.zipcode);
    addressForm.get("address2").setValue(this.shipAddress.address2);
    addressForm.get("city").setValue(this.shipAddress.city);
    addressForm.get("state_name").setValue(this.shipAddress.state.name);
    addressForm.get("firstname").setValue(this.shipAddress.firstname);
    addressForm.get("lastname").setValue(this.shipAddress.lastname);
    addressForm.get("address1").setValue(this.shipAddress.address1);
    addressForm.get("phone").setValue(this.shipAddress.phone);
  }

  showEditedAddress() {
    this.isAddressEdited.emit(true);
    this.checkoutService.fetchCurrentOrder().subscribe();
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
