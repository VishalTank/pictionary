import { IRoom } from './room';

export interface IUser {
	id?: number;
	name: string;
	email?: string;
	password?: string;
	isAdmin?: boolean;
	memberIn?: IRoom;
	createdAt?: Date;
	updatedAt?: Date;
}
