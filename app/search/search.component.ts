import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { IappState } from "~/app.reducers";
import { Product } from "../core/models/product";
import { SearchActions } from "./action/search.actions";
import { getPaginationData, getProductsLoader, getSearchedProducts } from "./reducers/selectors";

@Component({
  selector: "Search",
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})

export class SearchComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  page: number;
  queryParams: Params;
  counter = 1;
  subscriptionList$: Array<Subscription> = [];
  isProcessing: boolean;
  clearFocus: boolean = true;
  paginationData: any;

  constructor(
    private routernomal: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<IappState>,
    private searchActions: SearchActions) { }

  ngOnInit() {
    this.subscriptionList$.push(
      this.store.select(getSearchedProducts).subscribe((productdata) => {
        this.products = productdata;
      }),

      this.store.select(getPaginationData).subscribe((pagination) => {
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

  searchAgain() {
    this.store.dispatch(this.searchActions.clearSearchedProducts(false));
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
