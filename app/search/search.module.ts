import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "~/shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        SharedModule
    ],
    declarations: [
        SearchComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
