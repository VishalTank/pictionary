import socketIO, { Socket } from 'socket.io';
import http from 'http';

import { IMessage } from '../../models/message.model';
import { Connection, Disconnect, Info, Chat, JoinRoom, RemoveMember, AddMember } from './socket.events';
import { IUser } from './../../models/user.model';
import { RoomDbOps } from '../room/room.db';
import { logger } from './../../services/app.logger';

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

		this.io.on(Connection, (socket: Socket) => {
			this.user = JSON.parse(socket.handshake.query.user);

			if (this.user) {
				// When a user wants to join a room
				socket.on(JoinRoom, (room_id: string) => {
					this.addUserToRoom(socket, room_id)
				});

				// Chat messages
				socket.on(Chat, (message: IMessage) => {
					this.handleChatMessages(socket.handshake.query.room_id, message)
				});

				// When a user disconnects
				socket.on(Disconnect, () => {
					this.handleUserLeft(socket, socket.handshake.query.room_id)
				});
			}
		});
	}

	private addUserToRoom = (socket: Socket, room_id: string) => {

		// Join a room by ID
		socket.join(room_id);

		// When a new user has joined the given room
		this.handleUserJoined(socket, room_id);
	};

	private handleUserJoined = (socket: Socket, room_id: string): void => {

		const user = JSON.parse(socket.handshake.query.user);

		// Notify the user that just joined the room
		const welcomeMessage: IMessage = {
			author: null,
			type: Info,
			data: `Hey ${user.name}, Welcome to the Chat Room!`
		};
		socket.emit(Info, welcomeMessage);

		// Notify all users whenever someone joins the room
		const userJoinedMessage: IMessage = {
			author: null,
			type: Info,
			data: `${user.name} just hopped in this room!`
		};
		socket.broadcast.to(room_id).emit(Info, userJoinedMessage);

		// Add user to the room's member array
		RoomDbOps.addUserToRoom(room_id, user)
			.then(updatedRoom => {
				if (updatedRoom) {
					this.io.in(room_id).emit(AddMember, updatedRoom);
				}
			})
			.catch(err => {
				logger.error('can not add member to the room:', err);
			});
	};

	private handleChatMessages = (room_id: string, chatMessage: IMessage): void => {

		// Emit all the chat messages
		this.io.in(room_id).emit(Chat, chatMessage);
	};

	private handleUserLeft = (socket: Socket, room_id: string): void => {

		// Notify users whenever someone leaves the room
		const user = JSON.parse(socket.handshake.query.user);
		const userLeftMessage: IMessage = {
			author: null,
			type: Info,
			data: `${user.name} just left this room :(`
		};
		this.io.in(room_id).emit(Info, userLeftMessage);

		// Remove user from the room's members array (applies to all except room admins)
		RoomDbOps.removeUserFromRoom(room_id, user)
			.then(updatedRoom => {
				if (updatedRoom) {
					this.io.in(room_id).emit(RemoveMember, updatedRoom);
				}
			})
			.catch(err => {
				logger.error('can not remove member from the room:', err);
			});
	};
}
