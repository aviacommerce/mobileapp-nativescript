import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as app from "application";
import { registerElement } from "nativescript-angular/element-registry";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TextField } from "tns-core-modules/ui/text-field";
import { Variant } from "~/core/models/variant";
import { ProductService } from "~/core/services/product.service";
// tslint:disable-next-line:ordered-imports
import { VariantParserService } from "~/core/services/variant-parser.service";
import { VariantRetriverService } from "~/core/services/variant-retriver.service";
import { SearchActions } from "~/search/action/search.actions";
import { getProductsByKeyword } from "~/search/reducers/selectors";
import { CheckoutActions } from "../checkout/actions/checkout.actions";
import { Product } from "../core/models/product";
import { getProducts, productReviews, relatedProducts, showAllProducts } from "../product/reducers/selectors";
import { IappState } from "../reducers";
import { ProductActions } from "./../product/actions/product-actions";

@Component({
  selector: "Product",
  moduleId: module.id,
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})

export class ProductComponent implements OnInit, OnDestroy {
  @Output() selectedVariant = new EventEmitter<object>();

  products$: Observable<Product>;
  products: Product;
  relatedProducts$: Observable<any>;
  similarProducts$: Observable<Array<Product>>;
  reviewProducts$: Observable<any>;
  product: Product;
  relatedProducts;
  similarProducts;
  subscriptionList$: Array<Subscription> = [];
  reviews;
  queryParams: object;
  showThanks = false;
  submitReview = true;
  reviewForm: FormGroup;
  result;
  firstTx: string = "";
  rate: number;
  title: string;
  review: string;
  description: any;
  images: any;
  variantId: any;
  productID: any;
  customOptionTypesHash: any;
  currentSelectedOptions = {};
  mainOptions: any;
  correspondingOptions: any;
  selectedVariantPrice: any;
  isOrderable: boolean;
  constructor(
    private store: Store<IappState>,
    private actions: ProductActions,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private checkoutActions: CheckoutActions,
    private variantParser: VariantParserService) {
  }

  ngOnInit(): void {
    this.store.dispatch(this.actions.getAllProducts(1));
    const id = this.route.snapshot.queryParams.id;
    this.subscriptionList$.push(
      this.productService.getProduct(id).subscribe((data) => {
        this.product = data;
        this.getvariansInfo(this.product);
        //  this.initData();
      })
    );

    this.products$ = this.store.select(showAllProducts);
    this.store.dispatch(this.actions.getProductReviews(id));
    this.reviewProducts$ = this.store.select(productReviews);
  }

  getvariansInfo(product) {
    this.variantId = this.product.master.id;
    this.customOptionTypesHash = this.variantParser
      .getOptionsToDisplay(this.product.variants, this.product.option_types);
    this.mainOptions = this.makeGlobalOptinTypesHash(this.customOptionTypesHash);
    this.correspondingOptions = this.mainOptions;
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

  productDeatail(productID) {
    this.router.navigate(["/product"], {
      queryParams: {
        id: productID
      }
    });
  }

  parse(formData) {
    return {
      review: {
        rating: formData.rating.toString(),
        name: formData.name,
        title: formData.title,
        review: formData.review
      }
    };
  }

  onSubmit(prodId) {
    if (this.reviewForm.valid) {
      const values = this.reviewForm.value;
      const params = this.parse(values);
      this.productService.submitReview(prodId, params)
        .subscribe((res) => {
          this.result = res;
          if (this.result === "info") {
            this.goToProduct(this.product.slug);
          } else if (this.result === "success") {
            this.showThanks = true;
            this.submitReview = false;
          } else {
            this.goToProduct(this.product.slug);
          }
        });
    }
  }

  goToProduct(prodId) {
    this.router.navigate([prodId]);
  }

  addToCart(id: any) {
    // Todo: Get quantity from user input.
    this.store.dispatch(this.checkoutActions.addToCart(id, 1));
  }

  ngOnDestroy() {
    this.subscriptionList$.map((sub$) => sub$.unsubscribe());
  }

  initData() {
    if (this.product.has_variants) {
      const product = this.product.variants[0];
      this.description = product.description;
      this.images = product.images;
      this.variantId = product.id;
      this.productID = this.product.id;
      this.product.display_price = product.display_price;
      this.product.price = product.price;
      this.product.master.is_orderable = product.is_orderable;
      this.product.master.cost_price = product.cost_price;
    } else {
      this.description = this.product.description;
      this.images = this.product.master.images;
      this.variantId = this.product.master.id;
      this.productID = this.product.id;
    }
  }
  getSelectedVariant(variant) {
    this.selectedVariant.emit(variant)
  }
  onOptionClick(option) {
    const result = new VariantRetriverService().getVariant(
      this.currentSelectedOptions,
      this.customOptionTypesHash,
      option,
      this.product
    );

    this.createNewCorrespondingOptions(
      result.newCorrespondingOptions,
      option.value.optionValue.option_type_name
    );

    this.currentSelectedOptions = result.newSelectedoptions;
    const newVariant: Variant = result.variant;
    this.variantId = newVariant.id;
    this.description = newVariant.description;
    this.images = newVariant.images;
    this.product.display_price = result.variant.display_price;
    this.getSelectedVariant(result.variant);
    this.isOrderable = newVariant.is_orderable;
    this.product.master.cost_price = newVariant.cost_price;
    this.product.price = newVariant.price;
  }

  makeGlobalOptinTypesHash(customOptionTypes) {
    const temp = {};
    for (const key in customOptionTypes) {
      if (customOptionTypes.hasOwnProperty(key)) {
        temp[key] = Object.keys(customOptionTypes[key]);
      }
    }

    return temp;
  }

  createNewCorrespondingOptions(newOptions, optionKey) {
    for (const key in this.correspondingOptions) {
      if (this.correspondingOptions.hasOwnProperty(key) && key !== optionKey) {
        this.correspondingOptions[key] = newOptions[key];
      }
    }
  }
}
