import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {isAndroid} from "platform";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "ui/search-bar";

import { TextField } from "ui/text-field";
import { ProductService } from "~/core/services/product.service";
import { URLSearchParams } from '@angular/http';
@Component({
	selector: "sb-component",
	moduleId: module.id,
	templateUrl: "./searchbar-component.html",
	styleUrls: ["./searchbar-component.scss"]

})
export class SearchBarComponent {
	searchPhrase: string;
	searchBar;
	routernomal: any;
	queryParams: any;
	constructor(private router: Router, private myService: ProductService) {

	}
	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}
	onTextChanged(args) {
		this.searchBar = <SearchBar>args.object;
		
	}
	public sBLoaded(args){
		var searchbar:SearchBar = <SearchBar>args.object;
		if(isAndroid){
				
				searchbar.android.clearFocus();
		}
}
	onSubmit(args) {

		this.searchBar = <SearchBar>args.object;
		alert("You are searching for " + this.searchBar.text);

		const search = new URLSearchParams();
		search.set('q[name_cont_any]', this.searchBar.text);

		this.myService.getproductsByKeyword(search.toString())

		this.router.navigate(['/search'], {
			queryParams: {
				'serchval': search.toString()
			}
		});
		//this.router.navigate(["/search"]);
		this.searchBar.dismissSoftInput();


	}

}
