import { AddressComponent } from "./address/address.component";
import { CartComponent } from "./cart/cart.component";
import { OrderResponeComponent } from "./order-success/order-respone.component";

export const routes = [
  { path: "", redirectTo: "cart", pathMatch: "full" },
  { path: "cart", component: CartComponent },
  { path: "address", component: AddressComponent},
  { path: "order", component: OrderResponeComponent}
];
