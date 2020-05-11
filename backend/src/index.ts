require('dotenv').config();
import express from 'express';
import https from 'https';
import path from 'path';
import { server } from './server';
import { AppConfig } from './utils/app.config';
import { logger } from './services/app.logger';
import fs from 'fs';

class App {
	private app: express.Application = server.getServer();

	public initialize(): void {
		this.initializeHttpServer();
		this.initializeHttpsServer();
	}

	private initializeHttpServer(): void {
		this.app.listen(AppConfig.server.port, '0.0.0.0', () => {
			this.log(`HTTP Server started listening on: ${AppConfig.server.port}`);
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
		console.log(message);
		logger.info(message);
	}
}

const app = new App();

app.initialize();
