import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "~/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginRegisterComponent } from "./component/login-register/login-register.component";
import { AuthService } from "~/core/services/auth.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AuthComponent,
        LoginRegisterComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
