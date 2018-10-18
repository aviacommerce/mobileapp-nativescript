import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "~/shared/shared.module";
import { CheckoutActions } from "./actions/checkout.actions";
import { CartModule } from "./cart/cart.module";
import { routes } from "./checkout.routes";
import { CheckoutEffects } from "./effects/checkout.effects";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forRoot([
      CheckoutEffects
    ]),
    CartModule,
    SharedModule

  ],
  declarations: [

  ],
  providers: [
    CheckoutActions

  ]
})
export class CheckoutModule { }
