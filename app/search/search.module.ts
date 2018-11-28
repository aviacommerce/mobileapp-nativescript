import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { ProductActions } from "~/product/actions/product-actions";
import { SearchEffects } from "~/search/effects/search.effects";
import { SharedModule } from "~/shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { SearchActions } from './action/search.actions';
import { ProductEffects } from '~/product/effects/product.effects';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SearchRoutingModule,
    NativeScriptUIListViewModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    // EffectsModule.forRoot([SearchEffects, ProductEffects]),
    SharedModule
  ],
  declarations: [
    SearchComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    // ProductActions, SearchActions
  ]
})

export class SearchModule { }
