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
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        TaxonomyService
    ]
})
export class AppModule { }
