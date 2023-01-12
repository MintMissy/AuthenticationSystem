import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AppUser, isAppUser } from '../model/app-user.model';
import { AuthenticationResponse, AuthenticationService } from '../service/authentication.service';
import { UserFactory } from '../service/user.factory';
import { AuthenticationActions } from './auth.actions';

@Injectable()
export class AuthenticationEffects {
	private STORAGE_TOKEN_KEY = 'user';
	private LOGIN_REDIRECT_URL = '';
	private LOGOUT_REDIRECT_URL = '';

	constructor(
		private actions$: Actions,
		private authenticationService: AuthenticationService,
		private userFactory: UserFactory,
		private router: Router
	) {}

	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthenticationActions.login),
			mergeMap(({ loginCredentials: payload }) => {
				return this.authenticationService.login(payload).pipe(
					map((authResponse: AuthenticationResponse) => {
						const appUser = this.userFactory.create(authResponse);
						this.saveUserInStorage(appUser);
						this.router.navigate([this.LOGIN_REDIRECT_URL]);
						return AuthenticationActions.loginSuccess({ appUser: appUser });
					}),
					catchError((error) => of(AuthenticationActions.loginFailure({ error })))
				);
			})
		)
	);
	register$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthenticationActions.register),
			mergeMap(({ registerCredentials: payload }) => {
				return this.authenticationService.register(payload).pipe(
					map((authResponse: AuthenticationResponse) => {
						const appUser = this.userFactory.create(authResponse);
						this.saveUserInStorage(appUser);
						this.router.navigate([this.LOGIN_REDIRECT_URL]);
						return AuthenticationActions.registerSuccess({ appUser: appUser });
					}),
					catchError((error) => of(AuthenticationActions.registerFailure({ error })))
				);
			})
		)
	);
	logout$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthenticationActions.logout),
			mergeMap(() => {
				return this.authenticationService.logout().pipe(
					map(() => {
						this.removeUserInStorage();
						this.router.navigate([this.LOGOUT_REDIRECT_URL]);
						return AuthenticationActions.logoutSuccess();
					}),
					catchError((error) => of(AuthenticationActions.logoutFailure({ error: error })))
				);
			})
		);
	});
	loadUser$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(AuthenticationActions.loadUser),
			map(() => {
				const user = this.getUserFromStorage();
				if (user === null) {
					return AuthenticationActions.loadUserFailed();
				}
				return AuthenticationActions.loadUserSuccess({ appUser: user });
			})
		);
	});

	private removeUserInStorage() {
		localStorage.removeItem(this.STORAGE_TOKEN_KEY);
	}

	private saveUserInStorage(user: AppUser) {
		localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(user));
	}

	private getUserFromStorage(): AppUser | null {
		const stringifiedUser = localStorage.getItem(this.STORAGE_TOKEN_KEY);
		if (stringifiedUser === null) {
			return null;
		}
		const user = JSON.parse(stringifiedUser);
		if (isAppUser(user)) {
			return user;
		}
		return null;
	}
}
