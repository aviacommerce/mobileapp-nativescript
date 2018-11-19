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
import { ProductService } from '~/core/services/product.service';
import { switchMap } from 'rxjs/operators';
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
    private actions: ProductActions,
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

  showHideLoginSignup(isAuthenticated) {
    if (isAuthenticated) {
      return "*,0";
    } else {
      return "*,40";
    }
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

}
