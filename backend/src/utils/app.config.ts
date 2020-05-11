export const AppConfig = {
	mode: process.env.MODE || 'dev',
	server: {
		port: parseInt(process.env.PORT) || 3000,
		httpsPort: parseInt(process.env.HTTPS_PORT) || 8080,
		logLevel: process.env.LOG_LEVEL || 'info'
	}
};
