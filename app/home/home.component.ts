import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "ui/search-bar";

import { registerElement } from "nativescript-angular/element-registry";
import { TaxonomyService } from "~/core/services/taxonomy.service";
registerElement("StarRating", () => require("nativescript-star-ratings").StarRating);
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    texonomies;
    // tslint:disable-next-line:ban-types
    products: Object;
    taxonImageLink;
    searchPhrase: string;
    searchBar;
    promoImg = "../assets/promo.png";
    constructor(private myService: TaxonomyService) {

    }
    ngOnInit() {
        this.extractData();
    }
    extractData() {
        this.myService.getTaxonomies()
            .subscribe((result) => {
                this.texonomies = (result);

            });
        // this.myService.getProducts(1)
        //     .subscribe((productdata) => {
        //         this.products = productdata;
        //     });
    }

    onTextChanged(args) {
        this.searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + this.searchBar.text);
    }
}
