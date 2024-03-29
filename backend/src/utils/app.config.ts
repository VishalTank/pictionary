export const AppConfig = {
	mode: process.env.MODE || 'dev',
	server: {
		port: parseInt(process.env.PORT) || 3000,
		httpsPort: parseInt(process.env.HTTPS_PORT) || 8080,
		host: process.env.HOST || '0.0.0.0',
		logLevel: process.env.LOG_LEVEL || 'info'
	},
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 27017,
		name: process.env.DB_NAME || 'pictionary',
		type: process.env.DB_TYPE || 'mongodb'
	}
};
