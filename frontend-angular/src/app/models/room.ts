import { IUser } from './user';

export interface IRoom {
	room_id: string;
	members: IUser[];
}
