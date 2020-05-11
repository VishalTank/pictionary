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
		this.initializeHttpServer()
			.then(() => { })
			.catch(err => {
				console.log(err);
			});

		//? OPTIONAL
		// this.initializeHttpsServer();
	}

	private initializeHttpServer(): Promise<void> {

		return new Promise((resolve, reject) => {
			this.app
				.listen(AppConfig.server.port, '0.0.0.0', () => {
					logger.info(`HTTP Server started listening on: ${AppConfig.server.port}`);
					return resolve();
				});
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
