import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "~/shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { LineItemListComponent } from "./line-item-list/line-item-list.component";
import { LineItemComponent } from "./line-item-list/line-item/line-item.component";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    CartRoutingModule,
    NativeScriptUIListViewModule,
    SharedModule
  ],
  declarations: [
    CartComponent,
    LineItemListComponent,
    LineItemComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class CartModule { }
