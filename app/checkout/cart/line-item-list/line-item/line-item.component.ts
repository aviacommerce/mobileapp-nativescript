import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IappState } from "~/app.reducers";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { LineItem } from "~/core/models/line_item";
import { CheckoutService } from "~/core/services/checkout.service";
import { SharedService } from "~/core/services/shared.service";

@Component({
  moduleId: module.id,
  selector: "line-item",
  templateUrl: "./line-item.component.html",
  styleUrls: ["./line-item.component.css"]
})

export class LineItemComponent implements OnInit, OnDestroy {
  @Input() lineItem: LineItem;
  image: string;
  name: string;
  quantity: number;
  amount: number;
  quantityCount: number;
  optionTxt: string;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private store: Store<IappState>,
    private checkoutActions: CheckoutActions,
    private sharedService: SharedService,
    private checkoutService: CheckoutService) { }

  ngOnInit() {
    if (this.lineItem.variant.images[0]) {
      this.image = this.lineItem.variant.images[0].product_url;
    }
    this.name = this.lineItem.variant.name;
    this.quantity = this.lineItem.quantity;
    this.amount = this.lineItem.display_amount;
    this.quantityCount = this.quantity;
    this.optionTxt = this.lineItem.variant.options_text;
  }

  removeLineItem() {
    this.store.dispatch(this.checkoutActions.removeLineItem(this.lineItem));
  }

  removeQuantity() {
    this.quantityCount -= 1;
    if (this.quantityCount <= 1) {
      this.quantityCount = 1;
      if (this.quantity > 1) {
        this.store.dispatch(this.checkoutActions.addToCart(this.lineItem.variant_id, -1));
      }
    } else if (this.quantityCount > 1) {
      this.store.dispatch(this.checkoutActions.addToCart(this.lineItem.variant_id, -1));
    }
  }

  addQuantity() {
    const productInHands = this.lineItem.variant.total_on_hand;
    const backOrderable = this.lineItem.variant.is_backorderable;
    if (productInHands >= (this.quantityCount + 1) || backOrderable === true) {
      this.quantityCount += 1;
      this.store.dispatch(this.checkoutActions.addToCart(this.lineItem.variant_id, 1));
    } else {
      this.sharedService.infoMessage("Sorry! You can not add more quantity for this product.");
    }
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
