
import { List, Record, Map } from 'immutable';
import { Product } from '~/core/models/product';
import { Taxonomy } from '~/core/models/taxonomy';

export interface SearchState extends Map<string, any> {
  selectedFilters: List<Map<string, any>>;
  selectedTaxonIds: List<number>;
  productsByKeyword: List<Product>;
  getChildTaxons: List<Taxonomy>;
  categeoryLevel: List<any>;
  taxonomiByName: List<any>;
  paginationData: Map<string, any>;
  searchFilter: boolean;
}

export const SearchStateRecord = Record({
  selectedFilters: List([]),
  selectedTaxonIds: List([]),
  productsByKeyword: List([]),
  getChildTaxons: List([]),
  categeoryLevel: List([]),
  taxonomiByName: List([]),
  paginationData: Map({}),
  searchFilter: false
});
