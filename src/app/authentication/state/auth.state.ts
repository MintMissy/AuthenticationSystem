import { AppUser } from '../model/app-user.model';

export const AUTHENTICATION_FEATURE_KEY = 'Authentication';
export interface AuthenticationState {
	loggedUser: AppUser | null;
}

export const initialAuthenticationState: AuthenticationState = {
	loggedUser: null,
};
