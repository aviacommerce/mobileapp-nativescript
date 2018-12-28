import { List, Map, Record } from "immutable";
import { LineItem } from "./../../core/models/line_item";

export interface CheckoutState extends Map<string, any> {
  orderNumber: number;
  orderState: string;
  lineItemIds: List<number>;
  lineItemEntities: Map<number, LineItem>;
  totalCartItems: number;
  totalCartValue: number;
  billAddress: any;
  shipAddress: any;
  shipTotal: number;
  itemTotal: number;
  adjustmentTotal: number;
  stateList: List<number>;
}

export const CheckoutStateRecord = Record({
  orderNumber: null,
  orderState: null,
  lineItemIds: List([]),
  lineItemEntities: Map({}),
  totalCartItems: 0,
  totalCartValue: 0,
  billAddress: Map({}),
  shipAddress: Map({}),
  shipTotal: 0,
  itemTotal: 0,
  adjustmentTotal: 0,
  stateList: List([])
});
