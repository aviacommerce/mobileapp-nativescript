import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { IappState } from "~/app.reducers";
import { getTotalCartItems } from "~/checkout/reducers/selectors";

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

  constructor(
    private store: Store<IappState>,
    private router: Router,
    private routerExt: RouterExtensions) { }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getTotalCartItems)
        .subscribe((cartItems) => this.totalCartItems = cartItems)
    );
  }

  navigateToCart() {
    this.router.navigate(["/checkout/cart"]);
  }

  navigateBack() {
    this.routerExt.backToPreviousPage();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
