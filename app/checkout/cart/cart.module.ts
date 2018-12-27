import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgShadowModule } from "nativescript-ngx-shadow";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "~/shared/shared.module";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";
import { LineItemListComponent } from "./line-item-list/line-item-list.component";
@NgModule({
  imports: [
    NativeScriptCommonModule,
    CartRoutingModule,
    NativeScriptUIListViewModule,
    SharedModule,
    NgShadowModule
  ],
  declarations: [
    CartComponent,
    LineItemListComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})

export class CartModule { }
