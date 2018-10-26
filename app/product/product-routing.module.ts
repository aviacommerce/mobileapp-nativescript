import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ProductDetailsComponent } from "./component/product-details/product-details.component";

const routes: Routes = [
  { path: ":id", component: ProductDetailsComponent }
];
@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})

export class ProductRoutingModule { }
