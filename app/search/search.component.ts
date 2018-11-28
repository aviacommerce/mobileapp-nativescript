import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Subscription } from "rxjs";
import { IappState } from "~/app.reducers";
import { Product } from "../core/models/product";
import { getSearchedProducts, getProductsLoader } from "./reducers/selectors";

@Component({
  selector: "Search",
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})

export class SearchComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  page: number;
  upadatedstring: string;
  queryParams: Params;
  productCount: number;
  counter = 1;
  subscriptionList$: Array<Subscription> = [];
  isProcessing: boolean;

  constructor(
    private routernomal: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<IappState>) { }

  ngOnInit() {
    // this.isProcessing = false;
    this.store.select(getSearchedProducts).subscribe((productdata) => {
      this.products = productdata;
      if (this.products.length) {
        // this.isProcessing = true;
      }
    });

    this.activeRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    this.store.select(getProductsLoader).subscribe((loader) => {
      this.isProcessing = loader;
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

  viewProduct(slug: string) {
    this.routernomal.navigate(["/", slug]);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
