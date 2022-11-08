const baseConifg = require('./base.js');

baseConifg.mode('development');
baseConifg.devtool('cheap-module-source-map');

baseConifg.output
	.filename('[name]-[hash:10].bundle.js')
	.chunkFilename('[name]-[hash:10].chunk.js')
	.end();

baseConifg.devServer
	.hot(true)
	.open(true)
	.set('watchFiles', {
		paths: ['src/**/*', 'public/**/*'],
		options: {
			usePolling: false,
		},
	})
	.end()

//console.log(baseConifg.toString());
module.exports = baseConifg.toConfig();