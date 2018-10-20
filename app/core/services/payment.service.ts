import { Injectable } from "@angular/core";

@Injectable()
export class PaymentService {
  paymentMethodName = "COD";
  getDefaultSelectedMode(modes) {
    let selectedMode;
    modes.forEach((mode) => {
      if (mode.name === this.paymentMethodName) {
        selectedMode = mode;
      }

    });

    return selectedMode;
  }

}
