import { CheckoutEffects } from './effects/checkout.effects';
import { EffectsModule } from '@ngrx/effects';
import { CheckoutActions } from './actions/checkout.actions';
import { CartModule } from './cart/cart.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './checkout.routes';
import { SharedModule } from '~/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forRoot([
      CheckoutEffects
    ]),
    CartModule,
    SharedModule
    
  ],
  declarations: [

  ],
  providers: [
    CheckoutActions
    
  ]
})
export class CheckoutModule { }
