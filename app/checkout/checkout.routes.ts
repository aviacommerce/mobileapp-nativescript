import { AddressComponent } from "./address/address.component";
import { CartComponent } from "./cart/cart.component";

export const routes = [
  { path: "", redirectTo: "cart", pathMatch: "full" },
  { path: "cart", component: CartComponent },
  { path: "address", component: AddressComponent}
];
