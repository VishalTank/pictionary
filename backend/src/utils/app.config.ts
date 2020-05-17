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
		port: process.env.DB_PORT || 5432,
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'vishal',
		database_name: process.env.DB_NAME || 'test',
		type: process.env.DB_TYPE || 'postgres'
	}
};
