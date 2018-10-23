
import { HTTP_INTERCEPTORS, HttpClientModule, JsonpInterceptor } from "@angular/common/http";
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
import { ProductService } from "~/core/services/product.service";
import { TaxonomyService } from "~/core/services/taxonomy.service";
import { AuthActions } from "./auth/actions/auth.actions";
import { CheckoutActions } from "./checkout/actions/checkout.actions";
import { CheckoutEffects } from "./checkout/effects/checkout.effects";
import { TokenInterceptor } from "./core/interceptors/interceptor";
import { AuthService } from "./core/services/auth.service";
import { CheckoutService } from "./core/services/checkout.service";
import { JsonApiParserService } from "./core/services/json-api-parser.service";
import { PaymentService } from "./core/services/payment.service";
import { reducers } from "./reducers";

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
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      CheckoutEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  declarations: [
    AppComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [
    TaxonomyService,
    ProductService,
    CheckoutService,
    CheckoutActions,
    AuthService,
    AuthActions,
    PaymentService,
    JsonApiParserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class AppModule { }
