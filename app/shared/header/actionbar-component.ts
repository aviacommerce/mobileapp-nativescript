import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from "rxjs";
import { SearchBar } from "ui/search-bar";
import { IappState } from "~/app.reducers";
import { getTotalCartItems } from "./../../checkout/reducers/selectors";
@Component({
  selector: "ab-component",
  moduleId: module.id,
  templateUrl: "./actionbar-component.html",
  styleUrls: ["./actionbar-component.scss"]
})

export class ActionBarComponent implements OnInit {
  searchPhrase: string;
  searchBar;
  totalCartItems: Observable<number>;
  constructor(private store: Store<IappState>, private router: Router) { }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  ngOnInit() {
    this.totalCartItems = this.store.select(getTotalCartItems);
  }

  onSubmit(args) {
    this.searchBar = <SearchBar>args.object;
    alert("You are searching for " + this.searchBar.text);
  }

  navigateToCart() {
    this.router.navigate(["/checkout/cart"]);
  }
}
