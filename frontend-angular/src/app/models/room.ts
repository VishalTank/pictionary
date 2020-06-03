import { IUser } from './user';

export interface IRoom {
	id: number;
	room_id: string;
	members: IUser[];
	chat?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}
