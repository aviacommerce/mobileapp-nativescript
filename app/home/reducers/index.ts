import * as fromRoot from '../../reducers/index';
import { SearchState } from './search.state';
import * as fromSearch from './search.reducers';

export interface HomeState {
  search: SearchState;
}

export interface State extends fromRoot.State {
  'home': HomeState;
}

export const reducers = {
  search: fromSearch.reducer
};
