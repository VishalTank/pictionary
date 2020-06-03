import { BASE } from './base.constants';

export class API {
	public static ROOM = BASE.API + 'room/';
	public static CREATE_ROOM = BASE.ROOM + 'create/';
	public static GET_ROOM = BASE.ROOM + 'get/';
	public static ADD_USER_TO_ROOM = BASE.ROOM + 'add_user/';
}
