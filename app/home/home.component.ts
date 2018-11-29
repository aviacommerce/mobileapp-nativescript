import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IappState } from "~/app.reducers";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { Product } from "~/core/models/product";
import { ProductService } from "~/core/services/product.service";
import { environment } from "~/environments/environment";
import { ProductActions } from "~/product/actions/product-actions";
import { getTaxonomies } from "~/product/reducers/selectors";
import { SearchActions } from "~/search/action/search.actions";
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

  constructor(
    private router: Router,
    private store: Store<IappState>,
    private actions: ProductActions,
    private searchActions: SearchActions,
    private productService: ProductService) { }

  ngOnInit() {
    this.extractData();
    this.todaysDealsProduct();
  }

  extractData() {
    this.store.dispatch(this.actions.getAllTaxonomies());
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.isAuthenticated$ = this.store.select(getAuthStatus);
  }

  onSearchTapped() {
    this.store.dispatch(this.searchActions.clearSearchedProducts(false));
    this.router.navigate(["/search"], { queryParams: { clearFocus: false } });
  }

  onSelectedCategory(categoryId: number) {
    this.router.navigate(["/search"], { queryParams: { id: categoryId } });
    this.store.dispatch(this.searchActions.clearSearchedProducts(true));
    this.store.dispatch(this.searchActions.getProductsByTaxon(categoryId));
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
    let taxonomiesResponse: any;
    this.products$ = this.productService.getTaxonByName("Today's Deals").pipe(
      switchMap((response) => {
        taxonomiesResponse = response;
        if (taxonomiesResponse.count > 0 && taxonomiesResponse.taxonomies[0].root.id) {
          return this.productService.getProductsByTaxonNP(taxonomiesResponse.taxonomies[0].root.id);
        } else {
          return [];
        }
      }));
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
