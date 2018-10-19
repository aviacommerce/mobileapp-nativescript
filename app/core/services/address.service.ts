import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CState } from "../models/state";


@Injectable()
export class AddressService {
  constructor(
    private http: HttpClient
  ) { }

  createAddresAttributes(address) {
    return {
      order: {
        bill_address_attributes: address,
        ship_address_attributes: address
      }
    };
  }

  // Country ID: 105 is for INDIA.
  getAllStates(): Observable<Array<CState>> {
    return this.http
      .get<{ states: Array<CState> }>(`api/v1/countries/105/states`)
      .pipe(map((res) => res.states));
  }
}
