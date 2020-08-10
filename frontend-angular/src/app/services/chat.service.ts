import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IMessage } from './../models/message';
import { INFO, CHAT, JOIN_ROOM, ADD_MEMBER, REMOVE_MEMBER } from './../utilities/constants/socket.events';
import { IRoom } from '../models/room';
import { IUser } from './../models/user';
import { promise } from 'protractor';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	// Socket to connect to our socket.io server
	private socket: SocketIOClient.Socket;

	constructor() {
	}

	connectToChatServer(user: IUser, roomId: string): Promise<string> {

		return new Promise((resolve, reject) => {
			const stringifiedUser: string = JSON.stringify(user);

			this.socket = io(environment.SOCKET_ENDPOINT, { query: `user=${stringifiedUser}&roomId=${roomId}` });

			if (this.socket) {
				return resolve(roomId);
			}
			else {
				return reject(new Error('Can not connect to Chat Server'));
			}
		});
	}

	joinRoom(roomId): void {
		this.socket.emit(JOIN_ROOM, roomId);
	}

	sendChatMessage(message: IMessage): void {
		this.socket.emit(CHAT, message);
	}

	getMessages(): Observable<any> {

		return Observable.create(observer => {
			this.socket.on(CHAT, (message: IMessage) => {
				observer.next(message);
			});

			this.socket.on(INFO, (message: IMessage) => {
				observer.next(message);
			});
		});
	}

	getMembers(): Observable<any> {

		return Observable.create(observer => {
			this.socket.on(ADD_MEMBER, (updatedRoom: IRoom) => {
				observer.next(updatedRoom.members);
			});

			this.socket.on(REMOVE_MEMBER, (updatedRoom: IRoom) => {
				observer.next(updatedRoom.members);
			});
		})
	}
}
