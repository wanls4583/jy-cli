const Webpack = require('webpack');
const webpackConfig = require('../config/build.js');

const webpack = require('webpack');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
	if (err) {
		throw err;
	}
	console.log('Build successfully');
	compiler.close((closeErr) => {});
});