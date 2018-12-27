import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { isAndroid, isIOS } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getTotalCartItems } from "~/checkout/reducers/selectors";
import { environment } from "~/environments/environment";
@Component({
  selector: "ab-component",
  moduleId: module.id,
  templateUrl: "./actionbar-component.html",
  styleUrls: ["./actionbar-component.scss"]
})

export class ActionBarComponent implements OnInit, OnDestroy {

  totalCartItems: number;
  @Input() showName: string;
  @Input() showBackArrow: boolean;
  subscriptionList$: Array<Subscription> = [];
  logoUrl = environment.config.logoUrl;
  isIos = isIOS;
  isAndroid = isAndroid;

  constructor(
    private store: Store<IappState>,
    private router: RouterExtensions) { }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getTotalCartItems)
        .subscribe((items) => this.totalCartItems = items)
    );

    this.showName = this.showName ? this.showName : null;
  }

  navigateToCart() {
    // this.router.navigate(["/checkout/order/22"]);
    this.router.navigate(["/checkout/cart"]);
  }

  navigateBack() {
    this.router.back();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
