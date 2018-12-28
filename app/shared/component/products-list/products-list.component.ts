import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Product } from "~/core/models/product";
import { environment } from "~/environments/environment";

@Component({
  moduleId: module.id,
  selector: "products-list, [productList]",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})

export class ProductsListComponent implements OnInit {

  @Input() products: Array<Product>;
  @Input() listHeading: string;

  currency = environment.config.currencySymbol;
  constructor(private router: RouterExtensions) {
    //
  }

  ngOnInit() {
    //
  }

  trackByFn(index) {
    return index;
  }

  productDetail(productSlug: string) {
    this.router.navigate(["/", productSlug]);
  }
}
