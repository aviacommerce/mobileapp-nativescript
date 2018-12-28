import { CState } from "~/core/models/state";
import { LineItem } from "./../../core/models/line_item";
import { Order } from "./../../core/models/order";

export class CheckoutActions {
  static FETCH_CURRENT_ORDER_SUCCESS = "FETCH_CURRENT_ORDER_SUCCESS";
  static ADD_TO_CART = "ADD_TO_CART";
  static ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
  static REMOVE_LINE_ITEM = "REMOVE_LINE_ITEM";
  static REMOVE_LINE_ITEM_SUCCESS = "REMOVE_LINE_ITEM_SUCCESS";
  static CHANGE_LINE_ITEM_QUANTITY = "CHANGE_LINE_ITEM_QUANTITY";
  static PLACE_ORDER = "PLACE_ORDER";
  static CHANGE_ORDER_STATE = "CHANGE_ORDER_STATE";
  static CHANGE_ORDER_STATE_SUCCESS = "CHANGE_ORDER_STATE_SUCCESS";
  static UPDATE_ORDER = "UPDATE_ORDER";
  static UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
  static ORDER_COMPLETE_SUCCESS = "ORDER_COMPLETE_SUCCESS";
  static GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
  static GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
  static GET_STATES_LIST = "GET_STATES_LIST";
  static GET_STATES_LIST_SUCCESS = "GET_STATES_LIST_SUCCESS";

  fetchCurrentOrderSuccess(order: Order) {
    return {
      type: CheckoutActions.FETCH_CURRENT_ORDER_SUCCESS,
      payload: order
    };
  }

  addToCart(variantId: number, quantity: number) {
    return {
      type: CheckoutActions.ADD_TO_CART,
      payload: { variantId, quantity }
    };
  }

  addToCartSuccess(lineItem: LineItem) {
    return {
      type: CheckoutActions.ADD_TO_CART_SUCCESS,
      payload: lineItem
    };
  }

  removeLineItem(lineItemId: LineItem) {
    return {
      type: CheckoutActions.REMOVE_LINE_ITEM,
      payload: lineItemId
    };
  }

  removeLineItemSuccess(lineItem: LineItem) {
    return {
      type: CheckoutActions.REMOVE_LINE_ITEM_SUCCESS,
      payload: lineItem
    };
  }

  changeLineItemQuantity(quantity: number, lineItemId: number) {
    return {
      type: CheckoutActions.CHANGE_LINE_ITEM_QUANTITY,
      payload: { quantity, lineItemId }
    };
  }

  placeOrder() {
    return { type: CheckoutActions.PLACE_ORDER };
  }

  changeOrderState() {
    return { type: CheckoutActions.CHANGE_ORDER_STATE };
  }

  changeOrderStateSuccess(order: Order) {
    return {
      type: CheckoutActions.CHANGE_ORDER_STATE_SUCCESS,
      payload: order
    };
  }

  updateOrder() {
    return { type: CheckoutActions.UPDATE_ORDER };
  }

  updateOrderSuccess(order: Order) {
    return {
      type: CheckoutActions.UPDATE_ORDER_SUCCESS,
      payload: order
    };
  }

  orderCompleteSuccess() {
    return { type: CheckoutActions.ORDER_COMPLETE_SUCCESS };
  }

  getOrderDetails(orderNumber: string) {
    return {
      type: CheckoutActions.GET_ORDER_DETAILS,
      payload: orderNumber
    };
  }

  getOrderDetailsSuccess(order: Order) {
    return {
      type: CheckoutActions.GET_ORDER_DETAILS,
      payload: order
    };
  }

  getStatesLists() {
    return {
      type: CheckoutActions.GET_STATES_LIST
    };
  }

  getStatesListSuccess(states: Array<CState>) {
    return {
      type: CheckoutActions.GET_STATES_LIST_SUCCESS,
      payload: states
    };
  }
}
