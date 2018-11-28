import { map } from "rxjs/operators";
import { Product } from "./../../core/models/product";
import { Taxonomy } from "./../../core/models/taxonomy";
import { ProductActions } from "./../actions/product-actions";
import { ProductState, ProductStateRecord } from "./product-state";
export const initialState: ProductState = new ProductStateRecord() as ProductState;
import { fromJS, List, Map } from "immutable";
export function reducer(state = initialState, { type, payload }: any): ProductState {
  switch (type) {

    case ProductActions.GET_PRODUCT_DETAIL_SUCCESS:
      return state.merge({
        selectedProduct: payload
      }) as ProductState;

    case ProductActions.GET_ALL_PRODUCTS_SUCCESS:
      const _products: Array<Product> = payload.products;
      const _showAllProducts: Array<Product> = payload.products;

      return state.merge({
        showAllProducts: _showAllProducts
      }) as ProductState;

    case ProductActions.GET_ALL_TAXONOMIES_SUCCESS:
      const _taxonomies: Array<Taxonomy> = payload.taxonomies.taxonomies;

      return state.merge({
        taxonomies: _taxonomies,
        rootTaxonomyId: payload.taxonomies.taxonomies[0].id

      }) as ProductState;

    case ProductActions.GET_RELATED_PRODUCT_SUCCESS:
      const relatedProducts: Array<Product> = payload.products;

      return state.merge({
        relatedProducts
      }) as ProductState;

    case ProductActions.GET_REVIEWS_SUCCESS:
      const _productReviews = payload.reviews;

      return state.merge({
        productReviews: _productReviews
      }) as ProductState;

    default:
      return state;
  }
}
