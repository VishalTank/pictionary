import { IUser } from './user';

export interface IMessage {
	author: IUser;
	data: string;
	type?: string;
}
