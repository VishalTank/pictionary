// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import express from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';
import socketIO from 'socket.io';
import mongoose from 'mongoose';

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
			.catch(err => logger.error(err));

		// OPTIONAL
		// this.initializeHttpsServer();
	}

	private initializeHttpServer(): Promise<void> {

		return new Promise((resolve) => {
			this.httpServer = http.createServer(this.app);

			this.httpServer.listen(AppConfig.server.port, AppConfig.server.host, () => {
				logger.info(`HTTP Server started listening on port: ${AppConfig.server.port}`);
				resolve();
			});
		});
	}

	private initializeSocketIOServer(): Promise<void> {

		return new Promise((resolve, reject) => {
			new SocketHandler().createServer(this.httpServer)
				.then(() => {
					logger.info('Socket Server started successfully');
					resolve();
				})
				.catch(err => {
					logger.error('Can not create Socket Server');
					reject(err);
				});
		});
	}

	private initializeDatabaseServer(): Promise<void> {

		return new Promise((resolve, reject) => {
			const { name, host, port, type } = AppConfig.db;
			const dbUrl = `${type}://${host}:${port}/${name}`;

			mongoose.connect(dbUrl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			})
				.then(() => {
					logger.info(`Database connection successful on port: ${port}`);
					resolve();
				})
				.catch(err => {
					logger.error('Can not connect to database');
					reject(err);
				});
		});
	}

	private initializeHttpsServer(): void {
		const key: Buffer = fs.readFileSync(path.normalize('./keys/server.key'));
		const cert: Buffer = fs.readFileSync(path.normalize('./keys/server.cert'));

		https
			.createServer({ key, cert }, this.app)
			.listen(AppConfig.server.httpsPort, '0.0.0.0', () => {
				logger.info(`HTTPS Server started listening on: ${AppConfig.server.httpsPort}`);
			});
	}
}

const app = new App();

app.initialize();
