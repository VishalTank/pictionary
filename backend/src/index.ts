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

	private key: Buffer = fs.readFileSync(path.normalize('./keys/server.key'));
	private cert: Buffer = fs.readFileSync(path.normalize('./keys/server.cert'));
	private serverOptions = { key: this.key, cert: this.cert };

	public initializeHttpServer(): void {
		https
			.createServer(this.serverOptions, this.app)
			.listen(AppConfig.server.port, '0.0.0.0', () => {
				this.log(`HTTPS Server started listening on: ${AppConfig.server.port}`);
			});
	}

	private log(message: string): void {
		console.log(message);
		logger.info(message);
	}
}

const app = new App();

app.initializeHttpServer();
