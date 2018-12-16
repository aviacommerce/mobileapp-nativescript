import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable, Subscription } from "rxjs";
import { Page } from "tns-core-modules/ui/page/page";
import { IappState } from "~/app.reducers";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { Product } from "~/core/models/product";
import { environment } from "~/environments/environment";
import { ProductActions } from "~/product/actions/product-actions";
import { getTaxonomies, getTodaysDealsId } from "~/product/reducers/selectors";
import { SearchActions } from "~/search/action/search.actions";
import { getSearchedProducts } from "~/search/reducers/selectors";
import { HttpParams } from '@angular/common/http';
@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {
  taxonomies$: Observable<any>;
  products$: Observable<Array<Product>>;
  product: Product;
  isAndroid: boolean;
  isIos: boolean;
  subscriptionList$: Array<Subscription> = [];
  isAuthenticated$: Observable<boolean>;
  searchBoxplaceHolder = environment.config.searchBoxPlaceholder;
  promoImageUrl = environment.config.promoImageUrl;
  categories = environment.config.categories;
  todaysDeals = "Today's Deals";

  constructor(
    private router: RouterExtensions,
    private routerE: Router,
    private store: Store<IappState>,
    private actions: ProductActions,
    private searchActions: SearchActions,
    private page: Page) {
    this.routerE.routeReuseStrategy.shouldReuseRoute = (_) => {
      return false;
    };
  }

  ngOnInit() {
    // using nativescript page events for destroying component after navigation.

    this.page.on("navigatingFrom", (data) => {
      this.ngOnDestroy();
    });

    this.extractData();
    this.todaysDealsProduct();
  }

  extractData() {
    this.store.dispatch(this.actions.getAllTaxonomies());
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.isAuthenticated$ = this.store.select(getAuthStatus);
  }

  onSelectedCategory(categoryId: number) {
    this.router.navigate(["/search"], { queryParams: { id: categoryId } });
    this.store.dispatch(this.searchActions.clearSearchedProducts(true));
    let searchParams = new HttpParams();
    searchParams = searchParams.set("id", `${categoryId}`);
    this.store.dispatch(this.searchActions.getProductsByTaxon(searchParams));
  }

  showHideLoginSignup(isAuthenticated) {
    if (isAuthenticated) {
      return "*,0";
    } else {
      return "*,40";
    }
  }

  productDetail(slug: string) {
    this.router.navigate(["/", slug]);
  }

  goToLogin() {
    this.router.navigate(["auth", "login"]);
  }

  goToSignup() {
    this.router.navigate(["auth", "login"], { queryParams: { signUpFlag: true } });
  }

  todaysDealsProduct() {
    this.subscriptionList$.push(
      this.store.select(getTodaysDealsId).subscribe((dealsId) => {
        if (dealsId) {
          let searchParams = new HttpParams();
          searchParams = searchParams.set("id", `${dealsId}`);
          this.store.dispatch(this.searchActions.getProductsByTaxon(searchParams));
        }
      })
    );
    this.products$ = this.store.select(getSearchedProducts);
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
