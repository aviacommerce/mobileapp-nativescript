import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { IappState } from "~/app.reducers";
import { Order } from "../models/order";
import { CheckoutActions } from "./../../checkout/actions/checkout.actions";
import { LineItem } from "./../models/line_item";
import { SharedService } from "./shared.service";

@Injectable()
export class CheckoutService {

  constructor(
    private http: HttpClient,
    private actions: CheckoutActions,
    private store: Store<IappState>,
    private sharedService: SharedService) { }

  createNewLineItem(variantId: number, prodQuantity: number): Observable<LineItem> {
    if (!this.getOrderToken()) {
      const orderParams = { order: { line_items: { 0: { variant_id: variantId, quantity: prodQuantity } } } };

      return this.createNewOrder(orderParams).pipe(map((order) => order.line_items[0]));
    }

    const params = { line_item: { variant_id: variantId, quantity: prodQuantity } };

    const url = `api/v1/orders/${this.orderNumber()}/line_items?order_token=${this.getOrderToken()}`;

    return this.http.post<LineItem>(url, params).pipe(
      tap(
        (lineItem) => {
          return lineItem;
        },
        (_) => {
          localStorage.removeItem("order");
          this.createNewLineItem(variantId, prodQuantity).subscribe();
        }
      )
    );
  }

  // This API not works with Admin user
  createNewOrder(orderParams): Observable<Order> {
    const newOrderUrl = `api/v1/orders`;

    return this.http.post<Order>(newOrderUrl, orderParams).pipe(
      tap((order) => {
        this.setOrderTokenInLocalStorage({ order_token: order.token, order_number: order.number });
        this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order));
      }
        , (_) => {
          this.sharedService.errorMessage("Something went wrong!");
        }
      )
    );
  }

  fetchCurrentOrder() {
    return this.http.get<Order>("api/v1/orders/current").pipe(
      switchMap((order) => {
        if (order) {
          return of(order);
        } else {
          if (this.getOrderToken()) {
            const savedOrder = JSON.parse(localStorage.getItem("order"));

            return this.getOrder(savedOrder.order_number);
          } else {
            return of(null);
          }
        }
      }),
      map((order) => {
        if (!order) {
          localStorage.removeItem("order");

          return;
        }
        // tslint:disable-next-line:variable-name
        const { token, number } = order;
        this.setOrderTokenInLocalStorage({ order_token: token, order_number: number });

        return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order));
      })
    );
  }

  getOrder(orderNumber: string) {
    const url = `api/v1/orders/${orderNumber}?order_token=${this.getOrderToken()}`;

    return this.http.get<Order>(url);
  }

  deleteLineItem(lineItem: LineItem) {
    const url = `api/v1/orders/${this.orderNumber()}/line_items/${
      lineItem.id
      }?order_token=${this.getOrderToken()}`;

    return this.http.delete(url).pipe(
      map((_) => lineItem, (_) =>
        this.sharedService.infoMessage("Some error occured while deleting item from cart!")),
      catchError((error) => {
        return error;
      })
    );
  }

  changeOrderState() {
    const url = `api/v1/checkouts/${
      this.orderNumber()
      }/next.json?order_token=${this.getOrderToken()}`;

    return this.http
      .put<Order>(url, {})
      .pipe(
        map((order) =>
          this.store.dispatch(this.actions.changeOrderStateSuccess(order))
          , (error) => this.sharedService.errorMessage("Some error occuerd!"))
      );
  }

  updateOrder(params: any) {
    const url = `api/v1/checkouts/${
      this.orderNumber()
      }.json?order_token=${this.getOrderToken()}`;

    return this.http
      .put<Order>(url, params)
      .pipe(
        map((order) =>
          this.store.dispatch(this.actions.updateOrderSuccess(order))
        )
      );
  }

  availablePaymentMethods() {
    const url = `api/v1/orders/${this.orderNumber()}/payments/new?order_token=${this.getOrderToken()}`;

    return this.http.get<any>(url);
  }

  createNewPayment(paymentModeId: number, paymentAmount: number) {
    return this.http
      .post(
        `api/v1/orders/${
        this.orderNumber()
        }/payments?order_token=${this.getOrderToken()}`,
        {
          payment: {
            payment_method_id: paymentModeId,
            amount: paymentAmount
          }
        }
      );
  }

  getOrderToken() {
    const order = JSON.parse(localStorage.getItem("order"));

    return order ? order.order_token : null;
  }

  orderNumber() {
    const order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : {};

    return order ? order.order_number : null;
  }

  shipmentAvailability(pincode: number): Observable<{ available: boolean }> {
    return this.http
      .post<{ available: boolean }>(`address/shipment_availability`, { pincode });
  }

  setOrderTokenInLocalStorage(token: any): void {
    const jsonData = JSON.stringify(token);
    localStorage.setItem("order", jsonData);
  }

  getOrderDetail(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`api/v1/orders/${orderNumber}`);
  }
}
