import { Component, Input, OnInit } from "@angular/core";
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
  constructor() {
    //
  }

  ngOnInit() {
    //
  }

  productDetail(productSlug: string) {
    //
  }
}
