//Module
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgModule } from "@angular/core";
//Route
import { Routes } from "@angular/router";
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomeModule" },
  { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
  { path: "search", loadChildren: "./search/search.module#SearchModule" },
  { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
  { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
  { path: "product", loadChildren: "./product/product.module#ProductModule" }
];
@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
