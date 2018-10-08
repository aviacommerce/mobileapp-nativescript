import { Component, OnInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable, Subscription } from 'rxjs';
import { Product } from "../core/models/product";
import { State } from "../reducers";
import { Store } from "@ngrx/store";
import { ProductActions } from './../product/actions/product-actions';
import { getProducts, showAllProducts, relatedProducts } from "../product/reducers/selectors";
import * as app from "application";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "~/core/services/product.service";
import { SearchActions } from "~/search/action/search.actions";
import { getProductsByKeyword } from "~/search/reducers/selectors";
import { switchMap } from "rxjs/operators";
@Component({
  selector: "Product",
  moduleId: module.id,
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})

export class ProductComponent implements OnInit, OnDestroy {
  products$: Observable<Product>;
  products: Product;
  relatedProducts$: Observable<Array<Product>>;
  similarProducts$: Observable<Array<Product>>
  product;
  relatedProducts;
  similarProducts;
  subscriptionList$: Array<Subscription> = [];

  constructor(private store: Store<State>, private actions: ProductActions, private ProductService: ProductService,
    private route: ActivatedRoute, private router: Router, private searchActions: SearchActions) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.actions.getAllProducts(1));
    const id = this.route.snapshot.queryParams.id;
    this.subscriptionList$.push(
      this.ProductService.getProductDetail(id).subscribe(data => {
        this.product = data;
      }),
      this.store.select(showAllProducts).subscribe((productdata) => {
        this.products = productdata;
      })
    );
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  productDeatail(productID) {
    this.router.navigate(['/product'], {
      queryParams: {
        'id': productID
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionList$.map(sub$ => sub$.unsubscribe());
  }

}
