import { IUser } from './../models/user';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMessage } from './../models/message';
import { Info, Chat, JoinRoom } from './../utilities/constants/socket.events';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	// Socket to connect to our socket.io server
	private socket: SocketIOClient.Socket;

	constructor() {
	}

	connectToRoom(user: IUser, room_id: string): void {
		const stringifiedUser: string = JSON.stringify(user);

		this.socket = io(environment.SOCKET_ENDPOINT, { query: `user=${stringifiedUser}&room_id=${room_id}` });
		this.socket.emit(JoinRoom, room_id);
	}

	sendChatMessage(message: IMessage): void {
		this.socket.emit(Chat, message);
	}

	getMessages(): Observable<any> {

		return Observable.create(observer => {
			this.socket.on(Chat, (message: IMessage) => {
				observer.next(message);
			});

			this.socket.on(Info, (message: IMessage) => {
				observer.next(message);
			});
		});
	};
}
