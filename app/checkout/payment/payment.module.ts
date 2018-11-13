import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "~/shared/shared.module";
import { CashOnDeliveryComponent } from "./payment-modes/cash-on-delivery/cash-on-delivery.component";
import { PaymentModesComponent } from "./payment-modes/payment-modes.component";
import { PayubizHostedComponent } from "./payment-modes/payubiz-hosted/payubiz-hosted.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [PaymentModesComponent, CashOnDeliveryComponent, PayubizHostedComponent],

    providers: []
    ,
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentModule { }
