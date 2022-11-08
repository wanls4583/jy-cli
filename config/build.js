const baseConifg = require('./base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

baseConifg.mode('production');
baseConifg.devtool('source-map');

baseConifg.output
	.set('clean', true)
	.filename('[name]-[chunkhash:10].bundle.js')
	.chunkFilename('[name]-[chunkhash:10].chunk.js')
	.end();

baseConifg.module
	.rule('rule-css')
	.test(/\.css$/)
	.use('vue-style-loader').loader(MiniCssExtractPlugin.loader).end()

baseConifg.optimization
	.minimizer('css')
	.use(CssMinimizerWebpackPlugin)
	.end();

baseConifg.optimization
	.minimizer('js')
	.use(TerserPlugin)
	.end();

baseConifg.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [{
	filename: 'css/[contenthash].css'
}]).end();

//console.log(baseConifg.toString());
module.exports = baseConifg.toConfig();