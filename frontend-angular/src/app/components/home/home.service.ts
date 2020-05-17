import { API } from './../../utilities/constants/api.constants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HomeService {

	constructor(private http: HttpClient) { }

	createRoom(name): Observable<any> {
		console.log('NAME:', name);
		return this.http.post(API.CREATE_ROOM, { name });
	}
}
