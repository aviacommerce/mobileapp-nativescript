import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { Tutorial } from '../featured/models/tutorial.model';
import { reducer } from '../featured/reducer/tutorial.reducer';

export interface State {
  readonly tutorial: Tutorial[]
}
export const reducers: ActionReducerMap<State> = {
  tutorial: reducer
};
