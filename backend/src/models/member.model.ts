import { IUser } from './user.model';

export interface IMember {
	userInfo: IUser;
	isAdmin?: boolean;
}
