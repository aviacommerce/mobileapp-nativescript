export class ProductActions {

  static GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
  static GET_PRODUCT_DETAIL_SUCCESS = "GET_PRODUCT_DETAIL_SUCCESS";
  static CLEAR_SELECTED_PRODUCT = "CLEAR_SELECTED_PRODUCT";
  static GET_ALL_TAXONOMIES = "GET_ALL_TAXONOMIES";
  static GET_ALL_TAXONOMIES_SUCCESS = "GET_ALL_TAXONOMIES_SUCCESS";
  static GET_ALL_PRODUCTS_SEARCH_SUCCESS = "GET_ALL_PRODUCTS_SEARCH_SUCCESS";
  static GET_PRODUCTS_BY_TAXON = "GET_PRODUCTS_BY_TAXON";

  getProductDetail(id: string) {

    return {
      type: ProductActions.GET_PRODUCT_DETAIL,
      payload: id
    };
  }

  getProductDetailSuccess(data: { product }) {

    return {
      type: ProductActions.GET_PRODUCT_DETAIL_SUCCESS,
      payload: data
    };
  }

  clearSelectedProduct() {
    return { type: ProductActions.CLEAR_SELECTED_PRODUCT };
  }

  getAllTaxonomies() {
    return { type: ProductActions.GET_ALL_TAXONOMIES };
  }

  getAllTaxonomiesSuccess(taxonomies: any) {
    return {
      type: ProductActions.GET_ALL_TAXONOMIES_SUCCESS,
      payload: taxonomies
    };
  }

  getProductsByTaxon(taxonsId: number) {
    return {
      type: ProductActions.GET_PRODUCTS_BY_TAXON,
      payload: taxonsId
    };
  }
}
