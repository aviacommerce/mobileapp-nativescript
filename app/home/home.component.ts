import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { registerElement } from "nativescript-angular/element-registry";
import { Observable, Subscription } from "rxjs";
import { getAuthStatus } from "~/auth/reducers/selectors";
import { Product } from "~/core/models/product";
import { ProductActions } from "~/product/actions/product-actions";
import { getTaxonomies, showAllProducts } from "~/product/reducers/selectors";
import { IappState } from "~/reducers";
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);
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
  taxonImageLink;
  searchPhrase: string;
  searchBar;
  isAndroid: boolean;
  isIos: boolean;
  productID;
  promoImg = "../assets/promo.png";
  subscriptionList$: Array<Subscription> = [];
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<IappState>,
    private actions: ProductActions) { }

  ngOnInit() {
    this.extractData();
  }

  extractData() {
    this.store.dispatch(this.actions.getAllProducts(1));
    this.store.dispatch(this.actions.getAllTaxonomies());
    this.products$ = this.store.select(showAllProducts);
    this.taxonomies$ = this.store.select(getTaxonomies);
    this.isAuthenticated$ = this.store.select(getAuthStatus);
  }

  productDetail(slug: string) {
    this.router.navigate(["/", slug]);
  }

  goToLogin() {
    this.router.navigate(["auth", "login"]);
  }

  goToSignup() {
    this.router.navigate(["auth", "login"],
      { queryParams: { signUpFlag: true } });
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
