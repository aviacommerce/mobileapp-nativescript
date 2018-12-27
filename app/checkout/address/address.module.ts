import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { NgShadowModule } from "nativescript-ngx-shadow";
import { AddressService } from "~/core/services/address.service";
import { SharedModule } from "~/shared/shared.module";
import { AddAddressComponent } from "./add-address/add-address.component";
import { StatesModalComponent } from "./add-address/states-modal/states-modal.component";
import { AddressComponent } from "./address.component";
import { DeliveryAddressComponent } from "./delivery-address/delivery-address.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NgShadowModule
    ],
    declarations: [
        AddAddressComponent,
        AddressComponent,
        DeliveryAddressComponent,
        StatesModalComponent
    ],
    entryComponents: [StatesModalComponent],

    providers: [
        AddressService,
        ModalDialogService
    ]
    ,
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddressModule { }
