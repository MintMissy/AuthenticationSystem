import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppUser } from '../model/app-user.model';
import { LoginCredentials, RegisterCredentials } from '../model/credentials.model';

export const AuthenticationActions = createActionGroup({
	source: 'Authentication',
	events: {
		Login: props<{ loginCredentials: LoginCredentials }>(),
		'Login Success': props<{ appUser: AppUser }>(),
		'Login Failure': props<{ error: string }>(),
		Register: props<{ registerCredentials: RegisterCredentials }>(),
		'Register Success': props<{ appUser: AppUser }>(),
		'Register Failure': props<{ error: string }>(),
		Logout: emptyProps(),
		'Logout Success': emptyProps(),
		'Logout Failure': props<{ error: string }>(),
		'Load User': emptyProps(),
		'Load User Success': props<{ appUser: AppUser }>(),
		'Load User Failed': emptyProps(),
	},
});
