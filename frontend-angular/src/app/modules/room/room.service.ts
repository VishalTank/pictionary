import { API } from './../../utilities/constants/api.constants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RoomService {

	constructor(private http: HttpClient) { }

	getRoomDetails(room_id: string): Observable<any> {
		return this.http.get(API.GET_ROOM + room_id);
	}
}
