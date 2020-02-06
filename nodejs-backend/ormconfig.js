// noinspection JSConstantReassignment
module.exports = {
	/*
	 * Configurable
	 */
	'host': process.env.TYPEORM_HOST || 'localhost',
	'port': process.env.TYPEORM_PORT || 5432,
	'username': process.env.TYPEORM_USERNAME || 'project',
	'password': process.env.TYPEORM_PASSWORD || 'password',
	'database': process.env.TYPEORM_DATABASE || 'project',
	'synchronize': (process.env.TYPEORM_SYNCHRONIZE === 'true') || false,
	'logging': (process.env.TYPEORM_LOGGING === 'true') || false,

	/*
	 * Fixed
	 */
	'name': 'default',
	'type': 'postgres',
	'entities': [
		__dirname + '/dist/**/*.entity.js',
	],
};
