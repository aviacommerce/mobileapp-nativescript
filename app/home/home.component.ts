import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { TaxonomyService } from "~/core/services/taxonomy.service";
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
                console.log(this.texonomies.taxonomies);
            });
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
