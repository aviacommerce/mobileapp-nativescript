import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AuthService } from "~/core/services/auth.service";
import { SharedModule } from "~/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginRegisterComponent } from "./component/login-register/login-register.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
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
