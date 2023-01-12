import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user.model';
import { AuthenticationResponse } from './authentication.service';

@Injectable()
export class UserFactory {
	create(response: AuthenticationResponse): AppUser {
		const user = response.user;
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			token: user.token,
			accountStatus: user.acc_status,
		};
	}
}
