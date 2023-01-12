export type TokenHolder = { token: string };

export function isTokenHolder(value: unknown): value is TokenHolder {
	if (value == null || typeof value !== 'object') {
		return false;
	}
	return 'token' in value;
}
