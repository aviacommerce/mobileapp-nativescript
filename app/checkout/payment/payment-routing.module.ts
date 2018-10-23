import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PaymentModesComponent } from "./payment-modes/payment-modes.component";

const routes: Routes = [
  { path: "", component: PaymentModesComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})

export class PaymentRoutingModule { }
