
import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NgShadowModule } from "nativescript-ng-shadow";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { AppRoutingModule } from "~/app-routing.module";
import { AppComponent } from "~/app.component";
import { reducers } from "./app.reducers";
import { AuthenticationEffects } from "./auth/effects/auth.effects";
import { CheckoutEffects } from "./checkout/effects/checkout.effects";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    HttpClientModule,
    NativeScriptHttpClientModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
    NgShadowModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthenticationEffects, CheckoutEffects]),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    AppComponent

  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [

  ],
  providers: [
  ]
})

export class AppModule { }
