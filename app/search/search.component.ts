import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable, Subscription } from "rxjs";
import { Product } from "../core/models/product";
import { IappState } from "../reducers";
import { SearchActions } from "./action/search.actions";
import { getProductsByKeyword } from "./reducers/selectors";

@Component({
  selector: "Search",
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})

export class SearchComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  products1: object;
  page: number;
  upadatedstring: string;
  queryParams: Params;
  productCount: number;
  myItems: Array<string> = [];
  counter = 1;
  products$: Observable<Product>;
  subscriptionList$: Array<Subscription> = [];

  constructor(
    private routernomal: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<IappState>,
    private searchActions: SearchActions) { }

  ngOnInit() {
    this.store.select(getProductsByKeyword).subscribe((productdata) => {
      this.products = productdata;
    });

    this.activeRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  loadItems() {
    this.counter = this.counter + 1;
    const urlTree = this.routernomal.createUrlTree([], {
      queryParams: { page: this.counter },
      queryParamsHandling: "merge",
      preserveFragment: true
    });
    // this.routernomal.navigateByUrl(urlTree);
  }

  routeChange() {
    // this.store.dispatch(this.searchActions.getProductsByKeyword());
  }

  viewProduct(slug: string) {
    this.routernomal.navigate(["/", slug]);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
