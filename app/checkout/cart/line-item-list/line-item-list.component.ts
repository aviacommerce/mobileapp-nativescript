import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IappState } from "~/app.reducers";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { LineItem } from "~/core/models/line_item";
import { SharedService } from "~/core/services/shared.service";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "line-item-list, [lineItemsList]",
  templateUrl: "./line-item-list.component.html",
  styleUrls: ["./line-item-list.component.scss"]
})

export class LineItemListComponent implements OnInit {
  @Input() lineItems: Array<LineItem>;
  @Input() itemTotal: number;
  quantityCount: number;
  subscriptionList$: Array<Subscription> = [];
  lineItem: LineItem;
  currency = environment.config.currencySymbol;
  freeShippingAmount = environment.config.freeShippingAmount;
  isDeleting: boolean;

  constructor(
    private store: Store<IappState>,
    private checkoutActions: CheckoutActions,
    private sharedService: SharedService) { }

  ngOnInit() {
    //
  }

  removeLineItem(index: number) {
    this.lineItem = this.lineItems[index];
    this.store.dispatch(this.checkoutActions.removeLineItem(this.lineItem));
  }

  removeQuantity(index: number) {
    this.lineItem = this.lineItems[index];
    if (this.lineItem.quantity > 1) {
      this.store.dispatch(this.checkoutActions.addToCart(this.lineItem.variant_id, -1));
    }
  }

  addQuantity(index: number) {
    this.lineItem = this.lineItems[index];
    const productInHands = this.lineItem.variant.total_on_hand;
    const backOrderable = this.lineItem.variant.is_backorderable;
    if (productInHands > (this.lineItem.quantity) || backOrderable === true) {
      this.store.dispatch(this.checkoutActions.addToCart(this.lineItem.variant_id, 1));
    } else {
      this.sharedService.infoMessage("Sorry! You can not add more quantity for this product.");
    }
  }

  trackByFn(index) {
    return index;
  }

}
