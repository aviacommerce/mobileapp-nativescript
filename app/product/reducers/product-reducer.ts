import { Taxonomy } from "./../../core/models/taxonomy";
import { ProductActions } from "./../actions/product-actions";
import { ProductState, ProductStateRecord } from "./product-state";
export const initialState: ProductState = new ProductStateRecord() as ProductState;
export function reducer(state = initialState, { type, payload }: any): ProductState {

  switch (type) {

    case ProductActions.GET_PRODUCT_DETAIL_SUCCESS:
      return state.merge({
        selectedProduct: payload.product
      }) as ProductState;

    case ProductActions.GET_ALL_TAXONOMIES_SUCCESS:
      const _taxonomies: Array<Taxonomy> = payload.taxonomies.taxonomies;
      let dealsId: number;
      _taxonomies.forEach((taxonomies) => {
        if (taxonomies.name === "Today's Deals") {
          dealsId = taxonomies.root.id;
        }
      });

      return state.merge({
        taxonomies: _taxonomies,
        rootTaxonomyId: payload.taxonomies.taxonomies[0].id,
        todaysDealsId: dealsId

      }) as ProductState;

    default:
      return state;
  }
}
