import socketIO, { Socket } from 'socket.io';
import http from 'http';

import { IMessage } from '../../models/message.model';
import { IUser } from './../../models/user.model';
import { RoomDbOps } from '../room/room.db';
import { logger } from './../../services/app.logger';
import { CONNECTION, DISCONNECT, INFO, CHAT, JOIN_ROOM, ADD_MEMBER, REMOVE_MEMBER } from './socket.events';
import { welcomeMessage, userJoinedMessage, userLeftMessage } from './infoMessages';

export class SocketHandler {
	private io: socketIO.Server;
	private user: IUser;

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

		this.io.on(CONNECTION, (socket: Socket) => {
			this.user = JSON.parse(socket.handshake.query.user);

			if (this.user) {
				// When a user wants to join a room
				socket.on(JOIN_ROOM, (roomId: string) => {
					this.addUserToRoom(socket, roomId)
				});

				// Chat messages
				socket.on(CHAT, (message: IMessage) => {
					this.handleChatMessages(socket.handshake.query.roomId, message)
				});

				// When a user disconnects
				socket.on(DISCONNECT, () => {
					this.handleUserLeft(socket, socket.handshake.query.roomId)
				});
			}
		});
	}

	private addUserToRoom = (socket: Socket, roomId: string): void => {

		// Join a room by ID
		socket.join(roomId);

		// When a new user has joined the given room
		this.handleUserJoined(socket, roomId);
	};

	private handleUserJoined = (socket: Socket, roomId: string): void => {

		const user = JSON.parse(socket.handshake.query.user);

		// Notify the user that just joined the room
		socket.emit(INFO, welcomeMessage(user.name));

		// Notify all users whenever someone joins the room
		socket.broadcast.to(roomId).emit(INFO, userJoinedMessage(user.name));

		// Add user to the room's member array
		RoomDbOps.addUserToRoom(roomId, user)
			.then(updatedRoom => {
				this.io.in(roomId).emit(ADD_MEMBER, updatedRoom);
			})
			.catch(err => {
				logger.error('can not add member to the room:', err);
			});
	};

	private handleChatMessages = (roomId: string, chatMessage: IMessage): void => {

		// Emit all the chat messages
		this.io.in(roomId).emit(CHAT, chatMessage);
	};

	private handleUserLeft = (socket: Socket, roomId: string): void => {

		// Notify users whenever someone leaves the room
		const user = JSON.parse(socket.handshake.query.user);
		this.io.in(roomId).emit(INFO, userLeftMessage(user.name));

		// Remove user from the room's members array (applies to all except room admins)
		RoomDbOps.removeUserFromRoom(roomId, user)
			.then(updatedRoom => {
				this.io.in(roomId).emit(REMOVE_MEMBER, updatedRoom);
			})
			.catch(err => {
				logger.error('can not remove member from the room:', err);
			});
	};
}
