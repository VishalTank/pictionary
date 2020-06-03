import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from './../../models/user';
import { API } from './../../utilities/constants/api.constants';

@Injectable({
	providedIn: 'root'
})
export class RoomService {

	constructor(private http: HttpClient) { }

	getRoomDetails(room_id: string): Observable<any> {
		return this.http.get(API.GET_ROOM + room_id);
	}

	createUserAndAddToRoom(room_id: string, userObj: IUser): Observable<any> {
		return this.http.post(API.ADD_USER_TO_ROOM + room_id, userObj);
	}
}
