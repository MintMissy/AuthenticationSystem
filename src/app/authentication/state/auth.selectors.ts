import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState, AUTHENTICATION_FEATURE_KEY } from './auth.state';

const selector = createFeatureSelector<AuthenticationState>(AUTHENTICATION_FEATURE_KEY);

export const selectAuthenticationStatus = createSelector(
	selector,
	(state: AuthenticationState) => state.loggedUser != null
);

export const selectLoggedInUser = createSelector(selector, (state: AuthenticationState) => state.loggedUser);
export const selectAuthorizationToken = createSelector(
	selector,
	(state: AuthenticationState) => state.loggedUser?.token
);
