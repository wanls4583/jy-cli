const Webpack = require('webpack');
const webpackConfig = require('../config/build.js');

const webpack = require('webpack');

const build = () => {
	const compiler = webpack(webpackConfig);
	console.log('Start build...');
	compiler.run((err, stats) => {
		if (err) {
			throw err;
		}
		console.log('Build successfully');
		compiler.close((closeErr) => {});
	});
}

module.exports = build;