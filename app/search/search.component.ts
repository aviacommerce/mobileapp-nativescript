import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ProductService } from "~/core/services/product.service";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    products: Object;
    constructor(private myService: ProductService) {

    }
    ngOnInit() {
        this.extractData();
    }
    extractData() {
        this.myService.getProducts(1)
            .subscribe((productdata) => {
                this.products = productdata;
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
