import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectAuthenticationStatus } from '../state/auth.selectors';
import { AuthenticationState } from '../state/auth.state';

@Injectable({
	providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
	constructor(private store: Store<AuthenticationState>) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.store.select(selectAuthenticationStatus).pipe(map((status) => !status));
	}
}
