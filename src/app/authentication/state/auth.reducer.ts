import { createReducer, on } from '@ngrx/store';
import { AuthenticationActions } from './auth.actions';
import { initialAuthenticationState } from './auth.state';

export const authenticationReducer = createReducer(
	initialAuthenticationState,
	on(AuthenticationActions.registerSuccess, (state, { appUser }) => ({ ...state, loggedUser: appUser })),
	on(AuthenticationActions.loadUserSuccess, (state, { appUser }) => ({ ...state, loggedUser: appUser })),
	on(AuthenticationActions.loginSuccess, (state, { appUser }) => ({ ...state, loggedUser: appUser })),
	on(AuthenticationActions.logoutSuccess, (state) => ({ ...state, loggedUser: null }))
);
