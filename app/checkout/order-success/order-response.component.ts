
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { LineItem } from "~/core/models/line_item";
import { Order } from "~/core/models/order";
import { CheckoutService } from "~/core/services/checkout.service";
import { IappState } from "~/reducers";

@Component({
  selector: "Address",
  moduleId: module.id,
  templateUrl: "./order-response.component.html",
  styleUrls: ["./order-response.component.scss"]
})
export class OrderResponseComponent implements OnInit {
  queryParams: Params;
  orderDetails: Order;
  retryCount = 0;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private ostore: Store<IappState>,
    private checkoutService: CheckoutService,
    private activatedRouter: ActivatedRoute,
    private route: Router
    // tslint:disable-next-line:ban-types
  ) { }
  // //R099786036
  ngOnInit() {

    this.subscriptionList$.push(
      this.checkoutService.getOrderDetail("R099786036").subscribe((data) => {
        this.orderDetails = data;
        console.log(this.orderDetails);
      })
    );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

  // tslint:disable-next-line:variable-name
  getProductImageUrl(line_item: LineItem) {
    // tslint:disable-next-line:variable-name
    const image_url = line_item.variant.images[0].small_url;
    // tslint:disable-next-line:newline-before-return

    return image_url;
  }

  backToHome() {
    this.route.navigate(["/"]);
  }
}
