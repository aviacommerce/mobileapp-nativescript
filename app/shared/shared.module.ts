import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ActionBarComponent } from "~/shared/header/actionbar-component";
import { SearchBarComponent } from "~/shared/searchbar/searchbar-component";
import { SearchActions } from "~/search/action/search.actions";
import { SearchEffects } from "~/search/effects/search.effects";
import { EffectsModule } from "@ngrx/effects";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    EffectsModule.forRoot([SearchEffects]),
  ],
  declarations: [
    ActionBarComponent,
    SearchBarComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    ActionBarComponent,
    SearchBarComponent
  ],
  providers: [
    SearchActions
  ]
})

export class SharedModule { }
