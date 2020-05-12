require('dotenv').config();
import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import socketIO from 'socket.io';
import { server } from './server';
import { AppConfig } from './utils/app.config';
import { logger } from './services/app.logger';
import fs from 'fs';

class App {
	private app: express.Application = server.getServer();
	private httpServer: http.Server;
	private io: socketIO.Server;

	public initialize(): void {
		this.initializeHttpServer()
			.then(() => this.initializeSocketIOServer())
			.catch(err => console.log(err));

		//? OPTIONAL
		// this.initializeHttpsServer();
	}

	private initializeHttpServer(): Promise<void> {

		return new Promise((resolve, reject) => {
			this.httpServer = http.createServer(this.app);

			this.httpServer.listen(AppConfig.server.port, AppConfig.server.host, () => {
				this.log(`HTTP Server started listening on: ${AppConfig.server.port}`);
				resolve();
			});
		});
	}

	private initializeSocketIOServer(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.io = socketIO(this.httpServer);

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
					this.log('A user was disconnected from the socket.');
				});
			});
			resolve();
		});
	}

	private initializeHttpsServer(): void {
		const key: Buffer = fs.readFileSync(path.normalize('./keys/server.key'));
		const cert: Buffer = fs.readFileSync(path.normalize('./keys/server.cert'));

		https
			.createServer({ key, cert }, this.app)
			.listen(AppConfig.server.httpsPort, '0.0.0.0', () => {
				this.log(`HTTPS Server started listening on: ${AppConfig.server.httpsPort}`);
			});
	}

	private log(message: string): void {
		// console.log(message);
		logger.info(message);
	}
}

const app = new App();

app.initialize();
