import { createSelector } from "reselect";
import { IappState } from "~/reducers";
import { AuthState } from "./auth.state";

// Base state function
function getAuthState(state: IappState): AuthState {
    return state.auth;
}

// ******************** Individual selectors ***************************
const fetchAuthStatus = function(state: AuthState): boolean {
    return state.isAuthenticated;
};

// *************************** PUBLIC API's ****************************
export const getAuthStatus = createSelector(getAuthState, fetchAuthStatus);
