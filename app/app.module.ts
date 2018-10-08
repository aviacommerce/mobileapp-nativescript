
// Routes
import { AppRoutingModule } from "~/app-routing.module";

//Component
import { AppComponent } from "~/app.component";

//Module

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NgShadowModule } from "nativescript-ng-shadow";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TokenInterceptor } from './core/interceptors/interceptor';
//service
import { ProductService } from "~/core/services/product.service";
import { TaxonomyService } from "~/core/services/taxonomy.service";

//Reducer
import { reducers } from './reducers';

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
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})

export class AppModule { }
