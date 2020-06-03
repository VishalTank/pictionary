import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMessage } from './../models/message';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	// Socket to connect to our socket.io server
	private socket: SocketIOClient.Socket;

	constructor() {
	}

	connectToChatServer(): void {
		this.socket = io(environment.SOCKET_ENDPOINT);
	}

	setChatMessage(message: string): void {
		this.socket.emit('chat-message', message.toString());
	}

	getMessages(): Observable<any> {

		return Observable.create(observer => {
			this.socket.on('chat-message', (message: IMessage) => {
				observer.next(message);
			});

			this.socket.on('info-message', (message: IMessage) => {
				observer.next(message);
			});
		});
	};
}
