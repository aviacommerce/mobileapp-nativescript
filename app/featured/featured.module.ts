import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FeaturedRoutingModule } from "./featured-routing.module";
import { FeaturedComponent } from "./featured.component";
import { ReadComponent } from "~/featured/read/read.component";

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "~/shared/shared.module";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        FeaturedRoutingModule, 
        NativeScriptUIListViewModule,
       
        SharedModule
    ],
    declarations: [
        FeaturedComponent,
        ReadComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
