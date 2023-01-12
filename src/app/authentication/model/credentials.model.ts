import { UserData } from './user-data.model';

export type LoginCredentials = { email: string; password: string };

export type RegisterCredentials = UserData & { password: string };
