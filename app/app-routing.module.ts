import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./home/home.module#HomeModule",
    data: { preload: true, delay: true }
  },
  {
    path: "checkout",
    loadChildren: "./checkout/checkout.module#CheckoutModule",
    data: { preload: true, delay: true }
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule",
    data: { preload: true, delay: true }
  },
  {
    path: "",
    loadChildren: "./search/search.module#SearchModule",
    data: { preload: true, delay: true }
  },
  {
    path: "",
    loadChildren: "./product/product.module#ProductModule",
    data: { preload: true, delay: true }
  }

];
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
