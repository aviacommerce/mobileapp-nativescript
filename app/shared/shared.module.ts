import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ActionBarComponent } from "~/shared/header/actionbar-component";
import { SearchBarComponent } from "~/shared/searchbar/searchbar-component";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        ActionBarComponent,
        SearchBarComponent

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        ActionBarComponent,
        SearchBarComponent
    ]
})
export class SharedModule { }
