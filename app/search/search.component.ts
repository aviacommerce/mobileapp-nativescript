import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { ProductService } from "~/core/services/product.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: "Search",
	moduleId: module.id,
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
	products: Object;
	pet = "q%5Bname_cont_any%5D=bird";
	constructor(private myService: ProductService, private routernomal: Router, private activeRoute: ActivatedRoute) {

	}
	ngOnInit() {

		const queryParams = this.activeRoute.snapshot.queryParams
		const routeParams = this.activeRoute.snapshot.params;
		this.extractData(queryParams.serchval);
	}

	extractData(text) {	
		if (text) {
			this.myService.getproductsByKeyword(text)
			.subscribe((productdata) => {
				this.products = productdata;
			
			});
		}
		else {
			this.myService.getProducts(1)
				.subscribe((productdata) => {
					this.products = productdata;
				});
		}

	}
	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}


	queryMap = {
		Newest: 'updated_at+asc',
		'Avg.Customer Review': 'avg_rating+desc',
		'Most Reviews': 'reviews_count+desc',
		'A To Z': 'name+asc',
		'Z To A': 'name+desc',
		Relevance: '',
	}
	seltected = "Z To A"
	sortFilter(i) {
		const urlTree = this.routernomal.createUrlTree([], {
			queryParams: { "q[s]": this.queryMap[i] },
			queryParamsHandling: 'merge',
			preserveFragment: true,
		});
		//  this.routernomal.navigate(urlTree);

		//?q%5Bs%5D=name%2Bdesc

	}
}
