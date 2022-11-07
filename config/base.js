const Config = require('webpack-chain');
const path = require('path');
const Webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = new Config();
__dirname = process.cwd();

config.entry('main').add('./src/main.js').end();

config.output
	.path(path.resolve(__dirname, 'dist'))
	.end()

config.module
	.rule('rule-vue')
	.test(/\.vue$/)
	.use('vue').loader('vue-loader').end()
	.end()

config.module
	.rule('rule-css')
	.test(/\.css$/)
	.use('style-loader').loader('style-loader').end()
	.use('css-loader').loader('css-loader').end()

config.module.rule('rule-img')
	.test(/\.png$|\.jpg$|\.gif|\.svg$/)
	.type('asset')
	.parser({
		dataUrlCondition: {
			maxSize: 4 * 1024 // 小于4KB的图片会使用base64
		}
	})
	.set('generator', {
		filename: 'images/[name]-[hash:10][ext][query]',
	})
	.end();

config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [{
	patterns: [{
		from: path.resolve(__dirname, 'public'),
		to: path.resolve(__dirname, 'dist/public')
	}]
}]).end();

config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [{
	template: path.resolve(__dirname, 'public/index.html'),
	filename: 'index.html',
	chunks: ['main']
}]).end();

config.plugin('ProvidePlugin').use(Webpack.ProvidePlugin, [{
	$: 'jquery',
	jQuery: 'jquery',
}]).end();

config.plugin('VueLoaderPlugin').use(VueLoaderPlugin).end();

module.exports = config;