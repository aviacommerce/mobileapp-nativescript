import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "cash-on-delivery, [cod]",
  templateUrl: "./cash-on-delivery.component.html",
  styleUrls: ["./cash-on-delivery.component.scss"]
})

export class CashOnDeliveryComponent {

  @Output() payOnDelivery: EventEmitter<boolean> = new EventEmitter<boolean>();

  onPay() {
    this.payOnDelivery.emit(true);
  }
}
