import { Component, OnInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable, Subscription } from 'rxjs';
import { Product } from "../core/models/product";
import { State } from "../reducers";
import { Store } from "@ngrx/store";
import { ProductActions } from './../product/actions/product-actions';
import { getProducts, showAllProducts, relatedProducts, productReviews } from "../product/reducers/selectors";
import * as app from "application";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "~/core/services/product.service";
import { SearchActions } from "~/search/action/search.actions";
import { getProductsByKeyword } from "~/search/reducers/selectors";
import { switchMap } from "rxjs/operators";
import { registerElement } from 'nativescript-angular/element-registry';
import { FormGroup } from "@angular/forms";
import { TextField } from "tns-core-modules/ui/text-field";
import { CheckoutActions } from '../checkout/actions/checkout.actions'

@Component({
  selector: "Product",
  moduleId: module.id,
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})

export class ProductComponent implements OnInit, OnDestroy {
  products$: Observable<Product>;
  products: Product;
  relatedProducts$: Observable<any>;
  similarProducts$: Observable<Array<Product>>
  reviewProducts$: Observable<any>;
  product ;
  relatedProducts;
  similarProducts;
  subscriptionList$: Array<Subscription> = [];
  reviews;
  queryParams: any
  showThanks = false;  
  submitReview = true;
  reviewForm: FormGroup;
  result;
  firstTx: string = "";
  rate: Number;
  title: String;
  review: String;
  constructor(
    private store: Store<State>,
    private actions: ProductActions,
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private searchActions: SearchActions,
    private checkoutActions: CheckoutActions) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.actions.getAllProducts(1));
    const id = this.route.snapshot.queryParams.id;
    this.subscriptionList$.push(
      this.ProductService.getProductDetail(id).subscribe(data => {
        this.product = data;
      }),
    );
    this.products$ = this.store.select(showAllProducts)
    this.store.dispatch(this.actions.getProductReviews(id));
    this.reviewProducts$ = this.store.select(productReviews);
   
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

  parse(formData) {
    return {
      review: {
        rating: formData.rating.toString(),
        name: formData.name,
        title: formData.title,
        review: formData.review,
      }
    }
  }
  onSubmit(prodId) {
    if (this.reviewForm.valid) {
      const values = this.reviewForm.value;
      const params = this.parse(values)
      this.ProductService.submitReview(prodId, params)
        .subscribe(res => {
          this.result = res;
          if (this.result === 'info') {
            this.goToProduct(this.product.slug);
          } else if (this.result === 'success') {
            this.showThanks = true;
            this.submitReview = false;
          } else {
            this.goToProduct(this.product.slug)
          }
        })
    }
  }
  goToProduct(prodId) {
    this.router.navigate([prodId])
  }
  // submit() {
  //   alert(this.title);
  // }

  addToCart() {
    alert(this.product.id);
    this.store.dispatch(
      this.checkoutActions.addToCart(this.product.id, 1)
     );
  }
}
