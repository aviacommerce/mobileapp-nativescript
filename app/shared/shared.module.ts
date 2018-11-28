import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ActionBarComponent } from "./component/header/actionbar-component";
import { SearchBarComponent } from "./component/searchbar/searchbar-component";
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
  providers: []
})

export class SharedModule { }
