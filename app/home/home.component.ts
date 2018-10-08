import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { TaxonomyService } from "~/core/services/taxonomy.service";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { ProductActions } from "~/product/actions/product-actions";
import { showAllProducts } from "~/product/reducers/selectors";
import { ProductService } from "~/core/services/product.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);
@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {
  texonomies;
  products: Object;
  taxonImageLink;
  searchPhrase: string;
  searchBar;
  public isAndroid: boolean;
  public isIos: boolean;
  productID;
  promoImg = "../assets/promo.png";
  subscriptionList$: Array<Subscription> = [];
  constructor(private myService: TaxonomyService, private ProductService: ProductService,
    private route: ActivatedRoute, private router: Router, private store: Store<State>, private actions: ProductActions) {
  }

  ngOnInit() {
    this.extractData();
  }

  extractData() {
    this.store.dispatch(this.actions.getAllProducts(1));
    this.subscriptionList$.push(
      this.store.select(showAllProducts).subscribe((productdata) => {
        this.products = productdata;
      }),
      this.myService.getTaxonomies()
        .subscribe((result) => {
          this.texonomies = (result);
        })
    )
  }

  productDetail(productId) {
    this.router.navigate(['/product'], {
      queryParams: {
        'id': productId
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionList$.map(sub$ => sub$.unsubscribe());
  }
}
