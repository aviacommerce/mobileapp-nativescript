
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { LineItem } from "~/core/models/line_item";
import { Order } from "~/core/models/order";
import { CheckoutService } from "~/core/services/checkout.service";
import { IappState } from "~/reducers";

@Component({
  selector: "order-response",
  moduleId: module.id,
  templateUrl: "./order-response.component.html",
  styleUrls: ["./order-response.component.scss"]
})
export class OrderResponseComponent implements OnInit, OnDestroy {
  queryParams: Params;
  orderDetails: Order;
  retryCount = 0;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private ostore: Store<IappState>,
    private checkoutService: CheckoutService,
    private activatedRouter: ActivatedRoute,
    private route: Router
  ) { }

  // Todo: Dummy Order for now.
  ngOnInit() {
    this.subscriptionList$.push(
      this.checkoutService.getOrderDetail("R099786036").subscribe((data) => {
        this.orderDetails = data;
      })
    );
  }

  getProductImageUrl(lineItem: LineItem) {
    const imageUrl = lineItem.variant.images[0].small_url;

    return imageUrl;
  }

  backToHome() {
    this.route.navigate(["/"]);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
