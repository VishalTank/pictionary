import { IMember } from './member';

export interface IRoom {
	roomId: string;
	members: IMember[];
}
