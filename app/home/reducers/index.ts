import * as fromRoot from "../../reducers/index";
import * as fromSearch from "./search.reducers";
import { SearchState } from "./search.state";

export interface HomeState {
  search: SearchState;
}

export interface IappState extends fromRoot.IappState {
  "home": HomeState;
}

export const reducers = {
  search: fromSearch.reducer
};
