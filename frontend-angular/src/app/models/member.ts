import { IUser } from './user';

export interface IMember {
	isAdmin?: boolean;
	userInfo: IUser;
}
