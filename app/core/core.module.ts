
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AuthActions } from "~/auth/actions/auth.actions";
import { CheckoutActions } from "~/checkout/actions/checkout.actions";
import { SearchActions } from "~/search/action/search.actions";
import { TokenInterceptor } from "./interceptors/interceptor";
import { AuthService } from "./services/auth.service";
import { CheckoutService } from "./services/checkout.service";
import { JsonApiParserService } from "./services/json-api-parser.service";
import { PaymentService } from "./services/payment.service";
import { ProductService } from "./services/product.service";
import { SharedService } from "./services/shared.service";
import { TaxonomyService } from "./services/taxonomy.service";
import { VariantParserService } from "./services/variant-parser.service";
import { VariantRetriverService } from "./services/variant-retriver.service";

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [

  ],
  exports: [],

  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    TaxonomyService,
    ProductService,
    CheckoutService,
    AuthService,
    PaymentService,
    VariantParserService,
    VariantRetriverService,
    JsonApiParserService,
    SharedService,
    AuthActions,
    SearchActions,
    CheckoutActions,

    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})

export class CoreModule { }
