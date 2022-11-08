const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const runServer = async () => {
	const webpackConfig = require('../config/serve.js');
	const compiler = webpack(webpackConfig);
	const devServerOptions = {
		...webpackConfig.devServer
	};
	const server = new WebpackDevServer(devServerOptions, compiler);
	console.log('Starting server...');
	await server.start();
};

module.exports = runServer;