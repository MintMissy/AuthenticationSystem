import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, RegisterCredentials } from '../model/credentials.model';

export type AuthenticationResponse = {
	user: {
		id: number;
		email: string;
		username: string;
		acc_status: boolean;
		token: string;
	};
};

@Injectable()
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	login(data: LoginCredentials): Observable<AuthenticationResponse> {
		return this.httpClient.post<AuthenticationResponse>(`${environment.apiUrl}/users/login`, { user: data });
	}

	register(data: RegisterCredentials): Observable<AuthenticationResponse> {
		return this.httpClient.post<AuthenticationResponse>(`${environment.apiUrl}/users`, { user: data });
	}

	logout() {
		return this.httpClient.delete(`${environment.apiUrl}/users/logout`);
	}
}