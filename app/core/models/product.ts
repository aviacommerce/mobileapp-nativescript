import { Classification } from "./classification";
import { OptionType } from "./option_type";
import { ProductProperty } from "./product_property";
import { Variant } from "./variant";

export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  display_price: string;
  available_on: string;
  slug: string;
  is_favorited_by_current_user: boolean;
  meta_description: string;
  meta_keywords: string;
  shipping_category_id: number;
  taxon_ids: Array<number>;
  total_on_hand: number;
  has_variants: boolean;
  master: Variant;
  variants: Array<Variant>;
  option_types: Array<OptionType>;
  product_properties: Array<ProductProperty>;
  classifications: Array<Classification>;
  avg_rating: number;
  reviews_count: number;
  product_url?: string;
  currency_symbol: string;
}
