import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { EffectsModule } from "@ngrx/effects";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AuthService } from "~/core/services/auth.service";
import { SharedModule } from "~/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginRegisterComponent } from "./component/login-register/login-register.component";
import { AuthenticationEffects } from "./effects/auth.effects";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        SharedModule,
        NativeScriptFormsModule,
        EffectsModule.forRoot([
            AuthenticationEffects
          ])
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
