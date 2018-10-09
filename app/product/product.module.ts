
//Module
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

//Routes
import { ProductRoutingModule } from "~/product/product-routing.module";

//Component
import { ProductComponent } from "~/product/product.component";

//Actions
import { ProductActions } from "~/product/actions/product-actions";

//Effects
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from "~/product/effects/product.effects";

//Share Module
import { SharedModule } from "~/shared/shared.module";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    ProductRoutingModule,
    EffectsModule.forRoot([ProductEffects]),
    NativeScriptUIListViewModule,
    SharedModule
  ],
  declarations: [
    ProductComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ProductActions
  ]
})

export class ProductModule { }
