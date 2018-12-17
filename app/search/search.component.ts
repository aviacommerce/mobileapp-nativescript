import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { registerElement } from "nativescript-angular/element-registry";
import { Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { Pagination } from "~/core/models/pagination";
import { environment } from "~/environments/environment";
import { Product } from "../core/models/product";
import { SearchActions } from "./action/search.actions";
import { getPaginationData, getProductsLoader, getSearchedProducts } from "./reducers/selectors";
import { HttpParams } from '@angular/common/http';
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);

@Component({
  selector: "Search",
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})

export class SearchComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  paginationPage: number;
  queryParams: Params;
  counter = 1;
  subscriptionList$: Array<Subscription> = [];
  isProcessing: boolean;
  clearFocus: boolean = true;
  paginationData: any;
  currency = environment.config.currencySymbol;
  freeShipping = environment.config.freeShippingAmount;

  constructor(
    private routernomal: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<IappState>,
    private searchActions: SearchActions,
    private activatedRouter: ActivatedRoute,
    private page: Page) { }

  ngOnInit() {
    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.activatedRouter.queryParams.subscribe((params) => {
      this.queryParams = params;
    });

    this.subscriptionList$.push(
      this.store.select(getSearchedProducts).subscribe((productdata) => {
        this.products = productdata;
      }),

      this.store.select(getPaginationData).subscribe((pagination: Pagination) => {
        this.paginationData = pagination;
      }),

      this.activeRoute.queryParams.subscribe((params) => {
        this.queryParams = params;
        if (!this.queryParams.clearFocus) {
          this.clearFocus = false;
        }
      }),

      this.store.select(getProductsLoader).subscribe((loader) => {
        this.isProcessing = loader;
      })
    );
  }

  loadData(page: number) {
    let searchParams = new HttpParams();
    searchParams = searchParams.set("id", this.queryParams.id);
    searchParams = searchParams.set("page", `${page}`);
    this.store.dispatch(this.searchActions.getProductsByTaxon(searchParams));
  }

  loadMoreItems() {
    if (this.counter <= this.paginationData.pages) {
      this.counter = this.counter + 1;
      this.store.dispatch(this.searchActions.resetLoader(true));
      alert("load items");
      this.loadData(this.counter);
    }
  }

  viewProduct(slug: string) {
    this.routernomal.navigate(["/", slug]);
  }

  searchAgain() {
    this.store.dispatch(this.searchActions.clearSearchedProducts(false));
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
