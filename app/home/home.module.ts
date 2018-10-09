import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "~/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ProductActions } from "~/product/actions/product-actions";
import { SearchActions } from "~/search/action/search.actions";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from "~/product/effects/product.effects";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        EffectsModule.forRoot([ProductEffects]),
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        ProductActions,
        SearchActions
    ]
})
export class HomeModule { }
