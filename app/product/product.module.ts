
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { CheckoutEffects } from "~/checkout/effects/checkout.effects";
import { ProductActions } from "~/product/actions/product-actions";
import { ProductEffects } from "~/product/effects/product.effects";
import { ProductRoutingModule } from "~/product/product-routing.module";
import { ProductComponent } from "~/product/product.component";
import { SharedModule } from "~/shared/shared.module";
import { CheckoutActions } from "../checkout/actions/checkout.actions";
import { ProductDetailsComponent } from "./component/product-details/product-details.component";
import { ProductVariantsComponent } from "./component/product-variants/product-variants.component";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    ProductRoutingModule,
    EffectsModule.forRoot([ProductEffects, CheckoutEffects ]),
    NativeScriptUIListViewModule,
    SharedModule
  ],
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductVariantsComponent
  ],
  exports: [],

  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ProductActions,
    CheckoutActions
  ]
})

export class ProductModule { }
