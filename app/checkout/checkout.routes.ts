import { CartComponent } from "~/checkout/cart/cart.component";

export const routes = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' },
  { path: 'cart', component: CartComponent }
];
