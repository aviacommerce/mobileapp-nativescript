import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { CheckoutEffects } from "~/checkout/effects/checkout.effects";
import { SearchActions } from "~/search/action/search.actions";
import { SearchEffects } from "~/search/effects/search.effects";
import { ActionBarComponent } from "~/shared/header/actionbar-component";
import { SearchBarComponent } from "~/shared/searchbar/searchbar-component";
import { KeysPipe } from "./pipes/keys.pipe";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    EffectsModule.forRoot([SearchEffects]),
    EffectsModule.forRoot([CheckoutEffects])
  ],
  declarations: [
    ActionBarComponent,
    SearchBarComponent,
    KeysPipe
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    ActionBarComponent,
    SearchBarComponent,
    KeysPipe
  ],
  providers: [
    SearchActions,
    CheckoutActions
  ]
})

export class SharedModule { }
