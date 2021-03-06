
export class SearchActions {
  static GET_PRODUCTS_BY_KEYWORD = "GET_PRODUCTS_BY_KEYWORD";
  static GET_PRODUCTS_BY_TAXON = "GET_PRODUCTS_BY_TAXON";
  static GET_TAXONOMIES_BY_NAME = "GET_TAXONOMIES_BY_NAME";
  static GET_TAXONOMIES_BY_NAME_SUCCESS = "GET_TAXONOMIES_BY_NAME_SUCCESS";
  static CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
  static GET_SEARCHED_PRODUCTS = "GET_SEARCHED_PRODUCTS";
  static SEARCH_LOADER = "SEARCH_LOADER";

  category: string;

  getProductsByKeyword(keyword: object) {
    return {
      type: SearchActions.GET_PRODUCTS_BY_KEYWORD,
      payload: keyword
    };
  }

  getSearchedProducts(result: {products, pagination}) {
    return {
      type: SearchActions.GET_SEARCHED_PRODUCTS,
      payload: result
    };
  }

  getProductsByTaxon(taxonId: number) {
    return {
      type: SearchActions.GET_PRODUCTS_BY_TAXON,
      payload: taxonId
    };
  }

  getTaxonomiesByName(taxonomyName: string, categoryName: string) {
    this.category = categoryName;

    return {
      type: SearchActions.GET_TAXONOMIES_BY_NAME,
      payload: taxonomyName
    };
  }

  getTaxonomiesByNameSuccess(taxonomiList: any) {
    const category = this.category;

    return {
      type: SearchActions.GET_TAXONOMIES_BY_NAME_SUCCESS,
      payload: { taxonomiList, category }
    };
  }

  clearSearchedProducts(showLoader: boolean) {
    return {
      type: SearchActions.CLEAR_PRODUCTS,
      payload: showLoader
    };
  }
}
