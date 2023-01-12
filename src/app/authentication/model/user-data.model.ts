export type UserData = {
	username: string;
	email: string;
};

export function isUserData(value: unknown): value is UserData {
	if (value == null || typeof value !== 'object') {
		return false;
	}
	return 'username' in value && 'email' in value;
}
