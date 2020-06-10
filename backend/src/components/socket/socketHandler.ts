import socketIO from 'socket.io';
import http from 'http';

import { IMessage } from '../../models/message.model';
import { Connection, Disconnect, Info, Chat, JoinRoom } from './socket.events';
import { IUser } from './../../models/user.model';

export class SocketHandler {
	private io: socketIO.Server;
	private user: IUser;
	private room_id: string;

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
			this.user = JSON.parse(socket.handshake.query.user);

			if (this.user) {
				// When a user wants to join a room
				socket.on(JoinRoom, (room_id: string) => {
					this.addUserToRoom(socket, room_id)
				});

				// Chat messages
				socket.on(Chat, (message: IMessage) => {
					this.handleChatMessages(message)
				});

				// When a user disconnects
				socket.on(Disconnect, () => {
					this.handleUserLeft(socket)
				});
			}
		});
	}

	private addUserToRoom = (socket, room_id: string) => {
		this.room_id = room_id;

		// Join a room by ID
		socket.join(this.room_id);

		// When a new user has joined the given room
		this.handleUserJoined(socket);
	};

	private handleUserJoined = (socket): void => {

		// Notify the user that just joined the room
		const welcomeMessage: IMessage = {
			author: null,
			type: Info,
			data: `Hey ${this.user.name}, Welcome to the Chat Room!`
		};
		socket.emit(Info, welcomeMessage);

		// Notify all users whenever someone joins the room
		const userJoinedMessage: IMessage = {
			author: null,
			type: Info,
			data: `${this.user.name} just hopped in this room!`
		};
		socket.broadcast.to(this.room_id).emit(Info, userJoinedMessage);
	};

	private handleChatMessages = (chatMessage: IMessage): void => {

		// Emit all the chat messages
		this.io.in(this.room_id).emit(Chat, chatMessage);
	};

	private handleUserLeft = (socket): void => {

		// Notify users whenever someone leaves the room
		const user = JSON.parse(socket.handshake.query.user);
		const userLeftMessage: IMessage = {
			author: null,
			type: Info,
			data: `${user.name} just left this room :(`
		};
		this.io.in(this.room_id).emit(Info, userLeftMessage);
	};
}
