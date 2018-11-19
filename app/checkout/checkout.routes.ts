import { AddressComponent } from "./address/address.component";
import { CartComponent } from "./cart/cart.component";
import { OrderResponseComponent } from "./order-success/order-response.component";
import { PaymentModesComponent } from "./payment/payment-modes/payment-modes.component";

export const routes = [
  { path: "", redirectTo: "cart", pathMatch: "full" },
  { path: "cart", component: CartComponent },
  { path: "address", component: AddressComponent },
  { path: "order/:id", component: OrderResponseComponent },
  { path: "payment", component: PaymentModesComponent }
];
