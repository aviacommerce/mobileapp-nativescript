import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ActionBarComponent } from "./component/header/actionbar-component";
import { ProductsListComponent } from "./component/products-list/products-list.component";
import { SearchBarComponent } from "./component/searchbar/searchbar-component";
import { KeysPipe } from "./pipes/keys.pipe";
@NgModule({
  imports: [
    NativeScriptCommonModule],
  declarations: [
    ActionBarComponent,
    SearchBarComponent,
    ProductsListComponent,
    KeysPipe
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    ActionBarComponent,
    SearchBarComponent,
    ProductsListComponent,
    KeysPipe
  ],
  providers: []
})

export class SharedModule { }
