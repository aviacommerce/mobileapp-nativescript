import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { State } from "~/reducers";
import { getTotalCartValue, getTotalCartItems, getItemTotal } from "~/checkout/reducers/selectors";
@Component({
  selector: "Featured",
  moduleId: module.id,
  templateUrl: "./cart.component.html"
})

export class CartComponent implements OnInit {
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  shipTotal$: Observable<number>;
  itemTotal$: Observable<number>;

  constructor(private store: Store<State>) {
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
