import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "product-variants",
  templateUrl: "./product-variants.component.html",
  styleUrls: ["./product-variants.component.scss"]
})

export class ProductVariantsComponent {

  @Input() customOptionTypesHash: any;
  @Input() currentSelectedOptions = {};
  @Input() mainOptions;
  @Input() correspondingOptions;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOptionClickEvent = new EventEmitter();

  constructor() {
    //
  }

  onOptionClick(option) {
    this.onOptionClickEvent.emit(option);
  }

  isDisabled(arrayTocheck, value) {
    return (arrayTocheck.indexOf(value) === -1);
  }
}
