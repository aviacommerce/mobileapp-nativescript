import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "~/shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { ProductActions } from "~/product/actions/product-actions";
import { EffectsModule } from "@ngrx/effects";
import { SearchActions } from "./action/search.actions";
import { SearchEffects } from "~/search/effects/search.effects";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SearchRoutingModule,
    NativeScriptUIListViewModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    EffectsModule.forRoot([SearchEffects]),
    SharedModule
  ],
  declarations: [
    SearchComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ProductActions,
    SearchActions
  ]
})

export class SearchModule { }
