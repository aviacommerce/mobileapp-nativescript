import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { tap } from "rxjs/operators";
import { SharedService } from "./shared.service";

@Injectable()
export class AddressService {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  createAddresAttributes(address) {
    return {
      order: {
        bill_address_attributes: address,
        ship_address_attributes: address
      }
    };
  }

  initAddressForm() {
    return this.fb.group({
      firstname: ["", Validators.compose([Validators.required, this.noWhitespaceValidator])],
      lastname: ["", Validators.compose([Validators.required, this.noWhitespaceValidator])],
      address2: ["", Validators.compose([Validators.required, this.noWhitespaceValidator])],
      city: ["", Validators.compose([Validators.required, this.noWhitespaceValidator])],
      address1: ["", Validators.compose([Validators.required, this.noWhitespaceValidator])],
      phone: ["", Validators.compose(
        [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{10}")])],
      zipcode: ["", Validators.compose(
        [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9]{6}")])
      ],
      state_name: ["", Validators.required]
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;

    return isValid ? null : { whitespace: true };
  }

  updateAddress(updatedAddress, addressId, orderNumber) {
    const url = `api/v1/orders/${orderNumber}/addresses/${addressId}`;

    return this.http.put(url, { address_params: updatedAddress }).pipe(
      tap(
        (_) => this.sharedService.successMessage("Address updated!"),
        (_err) => this.sharedService.errorMessage("Address could not be updated!")
      )
    );
  }
}
