
import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from '~/product/product.component';

// Components


@NgModule({
  declarations: [
    // components
  
    ProductComponent,
   
    // pipes
  ],
  exports: [
    // components
  
  ],
  imports: [
   
    ProductRoutingModule,
  
  ],
  providers: [
    
  ]
})
export class ProductModule { }
