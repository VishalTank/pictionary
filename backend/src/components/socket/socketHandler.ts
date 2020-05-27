import socketIO from 'socket.io';
import http from 'http';

export class SocketHandler {
	private static io: socketIO.Server;

	public static createServer(httpServer: http.Server): Promise<void> {

		return new Promise((resolve, reject) => {
			this.io = socketIO(httpServer);
			this.handleSocketEvents(httpServer);

			if (this.io)
				resolve();
			else
				reject();
		});
	}

	private static handleSocketEvents(httpServer: http.Server): Promise<void> {

		return new Promise((resolve, reject) => {
			this.io = socketIO(httpServer, {
				transports: ['polling']
			});

			// When a user connects
			this.io.on('connection', (socket) => {

				socket.emit('message', 'Welcome to this chat');

				// Broadcast to other users
				socket.broadcast.emit('message', 'A User joined this chat');

				socket.on('chatMessage', (message: string) => {
					this.io.emit('message', message);
				});

				// When a user disconnects
				socket.on('disconnect', () => {
					this.io.emit('message', 'A User has left the chat');
				});
			});

			this.io ? resolve() : reject();
		});
	}
}
