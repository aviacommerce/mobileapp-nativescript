import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from "rxjs";
import { getItemTotal, getTotalCartItems, getTotalCartValue } from "~/checkout/reducers/selectors";
import { IappState } from "~/reducers";
import { environment } from "~/environments/environment";
@Component({
  selector: "Featured",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})

export class CartComponent implements OnInit {
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal$: Observable<number>;
  currency = environment.currency_symbol;
  constructor(private store: Store<IappState>) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    this.itemTotal$ = this.store.select(getItemTotal);
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
