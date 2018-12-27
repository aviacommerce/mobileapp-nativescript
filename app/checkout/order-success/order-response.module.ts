import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgShadowModule } from "nativescript-ngx-shadow";
import { SharedModule } from "~/shared/shared.module";
import { OrderResponseComponent } from "./order-response.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    SharedModule,
    NgShadowModule
  ],
  declarations: [
    OrderResponseComponent
  ],

  providers: [

  ]
  ,
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class OrderModule { }
