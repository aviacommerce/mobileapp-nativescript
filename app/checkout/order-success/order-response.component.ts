
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LineItem } from "~/core/models/line_item";
import { Order } from "~/core/models/order";
import { CheckoutService } from "~/core/services/checkout.service";

@Component({
  selector: "order-response",
  moduleId: module.id,
  templateUrl: "./order-response.component.html",
  styleUrls: ["./order-response.component.scss"]
})
export class OrderResponseComponent implements OnInit, OnDestroy {
  orderDetails: Order;
  subscriptionList$: Array<Subscription> = [];
  orderReferance: string;

  constructor(
    private checkoutService: CheckoutService,
    private activatedRouter: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.orderReferance = this.activatedRouter.snapshot.params.id;
    this.subscriptionList$.push(
      this.checkoutService.getOrderDetail(this.orderReferance).subscribe((data) => {
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
