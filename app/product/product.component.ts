import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from 'rxjs';
import { Product } from "~/core/models/product";
import { State } from "~/reducers";
import { Store } from "@ngrx/store";
import { ProductActions } from './../product/actions/product-actions';
import { getProducts, showAllProducts } from "~/product/reducers/selectors";

@Component({
	selector: "Product",
	moduleId: module.id,
	templateUrl: "./product.component.html"
})
export class ProductComponent implements OnInit {
	products$: Observable<Product>;
	products:[];
	constructor(private store: Store<State>, private actions: ProductActions) {	
		this.store.dispatch(this.actions.getAllProducts(1));
		this.store.select(showAllProducts).subscribe((productdata) => {
			this.products = productdata;	
		});
	}

	ngOnInit(): void {
	
	}
	
	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

}
