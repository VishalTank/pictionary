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

	getRoomDetails(roomId: string): Observable<any> {
		return this.http.get(API.GET_ROOM + roomId);
	}

	addUserToRoom(roomId: string, userObj: IUser): Observable<any> {
		return this.http.post(API.ADD_USER_TO_ROOM + roomId, userObj);
	}
}
