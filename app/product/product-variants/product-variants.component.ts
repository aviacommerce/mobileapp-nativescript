import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
@Component({
  moduleId: module.id,
  selector: "product-variants",
  templateUrl: "./product-variants.component.html",
  styleUrls: ["./product-variants.component.scss"]
})

export class ProductVariantsComponent implements OnInit {
  @Input() customOptionTypesHash: any;
  @Input() currentSelectedOptions = {};
  @Input() mainOptions;
  @Input() correspondingOptions;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOptionClickEvent = new EventEmitter();
  // tslint:disable-next-line:no-empty
  constructor() {

  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {

    console.log(this.customOptionTypesHash);
    console.log(this.currentSelectedOptions);
    console.log(this.correspondingOptions);
    console.log(this.mainOptions);
  }

  onOptionClick(option) {
    this.onOptionClickEvent.emit(option);
  }

  isDisabled(arrayTocheck, value) {
    return (arrayTocheck.indexOf(value) === -1);
  }
}
