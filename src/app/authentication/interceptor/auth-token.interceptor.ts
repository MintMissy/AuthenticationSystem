import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { selectAuthorizationToken } from '../state/auth.selectors';
import { AuthenticationState } from '../state/auth.state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
	constructor(private store: Store<AuthenticationState>) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return this.store.select(selectAuthorizationToken).pipe(
			switchMap((token) => {
				const clonedRequest = request.clone();

				clonedRequest.headers.set('Content-Type', 'application/json');
				if (token !== undefined) {
					clonedRequest.headers.set('Authorization', `Token ${token}`);
				}

				return next.handle(clonedRequest);
			})
		);
	}
}