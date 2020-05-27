require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import socketIO from 'socket.io';
import { createConnection, ConnectionOptions } from 'typeorm';

import { server } from './server';
import { AppConfig } from './utils/app.config';
import { logger } from './services/app.logger';
import { SocketHandler } from './components/socket/socketHandler';

class App {
	private app: express.Application = server.getServer();
	private httpServer: http.Server;
	private io: socketIO.Server;

	public initialize(): void {
		this.initializeHttpServer()
			.then(() => this.initializeSocketIOServer())
			.then(() => this.initializeDatabaseServer())
			.catch(err => this.log(err));

		// OPTIONAL
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
			SocketHandler.createServer(this.httpServer)
				.then(() => {
					this.log('Socket server created successfully');
					resolve();
				})
				.catch(err => {
					this.log('Can not create Socket server');
					reject(err);
				});
		});
	}

	private initializeDatabaseServer(): Promise<void> {

		return new Promise((resolve, reject) => {
			const { database_name, username, password, host, port } = AppConfig.db;

			const connectionOptions: ConnectionOptions = {
				type: "postgres",
				host,
				port: port as number,
				username,
				password,
				database: database_name,
				entities: [
					path.join(__dirname, 'models', '*.model.ts')
				],
				synchronize: true,
				logging: false
			};

			createConnection(connectionOptions)
				.then(connection => {
					this.log('Database connection successful');
					resolve();
				})
				.catch(err => {
					this.log('Can not connect to database');
					reject(err);
				})
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
