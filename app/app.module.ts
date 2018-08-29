import { HttpClientModule } from "@angular/common/http";
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { AppRoutingModule } from "~/app-routing.module";
import { AppComponent } from "~/app.component";
import { TaxonomyService } from "~/core/services/taxonomy.service";

import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { NgShadowModule } from "nativescript-ng-shadow";
import { ProductService } from "~/core/services/product.service";
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

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
				StoreModule.forRoot(reducers ),
  
				

    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        TaxonomyService,
        ProductService
    ]
})
export class AppModule { }
