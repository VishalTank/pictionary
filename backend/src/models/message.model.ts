import { IUser } from './user.model';

export interface IMessage {
	author: IUser;
	data: string;
	type?: string;
}
