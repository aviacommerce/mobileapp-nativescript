import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "~/shared/shared.module";
import { PaymentModesComponent } from "./payment-modes/payment-modes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [PaymentModesComponent],

    providers: []
    ,
    schemas: [
      NO_ERRORS_SCHEMA
    ]
})
export class PaymentModule { }
