
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import * as application from "application";
// tslint:disable-next-line:no-duplicate-imports
import { AndroidActivityBackPressedEventData, AndroidApplication } from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { isIOS, Page } from "tns-core-modules/ui/page/page";
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
  isIos = isIOS;
  isProcessing: boolean;

  constructor(
    private checkoutService: CheckoutService,
    private activatedRouter: ActivatedRoute,
    private route: RouterExtensions,
    private page: Page
  ) {
    if (!this.isIos) {
      application.android.on(AndroidApplication.activityBackPressedEvent,
        (data1: AndroidActivityBackPressedEventData) => {
          data1.activity = true;
          this.route.navigate(["/"], { clearHistory: true });
        });
    }
  }

  ngOnInit() {
    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.orderReferance = this.activatedRouter.snapshot.params.id;
    this.isProcessing = true;
    this.subscriptionList$.push(
      this.checkoutService.getOrderDetail(this.orderReferance).subscribe((data) => {
        this.orderDetails = data;
        this.isProcessing = false;
      })
    );
  }

  getProductImageUrl(lineItem: LineItem) {
    const imageUrl = lineItem.variant.images[0].small_url;

    return imageUrl;
  }

  backToHome() {
    this.route.navigate(["/"], { clearHistory: true });
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
