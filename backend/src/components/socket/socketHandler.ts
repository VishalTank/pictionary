import socketIO from 'socket.io';
import http from 'http';

import { IMessage } from '../../models/message.model';
import { Connection, Disconnect, Info, Chat, NewMember } from './socket.events';
import { WelcomeMessage, UserJoinedMessage, UserLeftMessage } from './socket.constants';

export class SocketHandler {
	private io: socketIO.Server;

	public createServer(httpServer: http.Server): Promise<void> {

		return new Promise((resolve, reject) => {
			this.io = socketIO(httpServer, {
				transports: ['polling']
			});

			if (this.io) {
				this.handleSocketEvents();
				resolve();
			}
			else {
				reject();
			}
		});
	}

	private handleSocketEvents(): void {

		this.io.on(Connection, (socket) => {
			// When a new user connects
			this.handleUserJoined(socket);

			socket.on(Chat, (message: IMessage) => {
				this.handleChatMessages(message)
			});

			// When a user disconnects
			socket.on(Disconnect, this.handleUserLeft);
		});
	}

	private handleUserJoined = (socket): void => {

		// Alert the user that joined the room
		socket.emit(Info, WelcomeMessage);

		// Alert Other users when a new user joins
		socket.broadcast.emit(Info, UserJoinedMessage);
		this.io.emit(NewMember)
	}

	private handleChatMessages = (ChatMessage: IMessage): void => {

		// Emit all the chat messages
		this.io.emit(Chat, ChatMessage);
	}

	private handleUserLeft = (): void => {

		// Alert users when someone leaves the room
		this.io.emit(Info, UserLeftMessage);
	}
}
