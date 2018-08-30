import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ProductComponent } from "~/product/product.component";
import { ProductRoutingModule } from "~/product/product-routing.module";
import { ProductActions } from "~/product/actions/product-actions";

import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from "~/product/effects/product.effects";

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
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
    ProductActions,

  ]
})
export class ProductModule { }
