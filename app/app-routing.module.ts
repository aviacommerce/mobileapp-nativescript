import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomeModule" },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
  { path: "search", loadChildren: "./search/search.module#SearchModule" },
  { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
  { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
  { path: "product", loadChildren: "./product/product.module#ProductModule" },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule',
    data: { preload: true, delay: true },
  },
];
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
