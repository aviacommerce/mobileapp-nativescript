import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { SearchActions } from "~/search/action/search.actions";
import { ActionBarComponent } from "~/shared/header/actionbar-component";
import { SearchBarComponent } from "~/shared/searchbar/searchbar-component";
import { KeysPipe } from "./pipes/keys.pipe";
@NgModule({
  imports: [
    NativeScriptCommonModule],
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
    // SearchActions,
    // CheckoutActions
  ]
})

export class SharedModule { }
