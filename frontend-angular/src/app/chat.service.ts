import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	// Socket to connect to our socket.io server
	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = io(environment.SOCKET_ENDPOINT);
	}

	sendMessage(message: string): void {
		this.socket.emit('chatMessage', message.toString());
	}

	public getMessages(): Observable<any> {
		return Observable.create(observer => {
			this.socket.on('message', message => {
				observer.next(message);
			});
		});
	};
}
