import { isTokenHolder, TokenHolder } from './token-holder.model';
import { isUserData, UserData } from './user-data.model';

export type AppUser = TokenHolder & UserData & { id: number; accountStatus: boolean };

export function isAppUser(value: unknown): value is AppUser {
	if (value == null || typeof value !== 'object') {
		return false;
	}
	return isUserData(value) && isTokenHolder(value) && 'id' in value && 'accountStatus' in value;
}
