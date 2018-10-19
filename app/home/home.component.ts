import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { registerElement } from "nativescript-angular/element-registry";
import { Observable, Subscription } from "rxjs";
import { Product } from "~/core/models/product";
import { TaxonomyService } from "~/core/services/taxonomy.service";
import { ProductActions } from "~/product/actions/product-actions";
import { showAllProducts } from "~/product/reducers/selectors";
import { IappState } from "~/reducers";
import { Taxonomy } from "~/core/models/taxonomy";
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);
@Component({
  selector: "Home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {
  texonomies: Array<Taxonomy>;
  products$: Observable<Product>;
  products: object;
  taxonImageLink;
  searchPhrase: string;
  searchBar;
  isAndroid: boolean;
  isIos: boolean;
  productID;
  promoImg = "../assets/promo.png";
  subscriptionList$: Array<Subscription> = [];
  constructor(
    private myService: TaxonomyService,
    private router: Router, private store: Store<IappState>,
    private actions: ProductActions) {
      this.extractData();
  }

  ngOnInit() {
    
  }

  extractData() {
    this.store.dispatch(this.actions.getAllProducts(1));
    this.subscriptionList$.push(
      this.myService.getTaxonomies()
        .subscribe((result) => {
          this.texonomies = (result);
        })
    );
    this.products$ = this.store.select(showAllProducts);
  }

  productDetail(productId) {
    this.router.navigate(["/product"], {
      queryParams: {
        id: productId
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }
}
