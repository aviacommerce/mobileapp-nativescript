import { Variant } from "./variant";
export class LineItem {
	id: number;
	quantity: number;
	price: number;
	single_display_amount: number;
	total: number;
	display_amount: number;
	variant_id: number;
	variant: Variant;
}
