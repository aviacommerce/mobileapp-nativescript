import { NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AddressService } from "~/core/services/address.service";
import { SharedModule } from "~/shared/shared.module";
import { AddAddressComponent } from "./add-address/add-address.component";
import { AddressComponent } from "./address.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddAddressComponent,
        AddressComponent
    ],

    providers: [
        AddressService
    ]
    ,
    schemas: [
      NO_ERRORS_SCHEMA
    ]
})
export class AddressModule { }
