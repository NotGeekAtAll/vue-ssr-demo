const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProd ? 'production' : 'development',
	output: {
    path: path.resolve(__dirname, '../dist'),
    // dev用dist，prod就相对根路径
		publicPath: isProd ? '/' : '/dist/',
		filename: '[name].[chunkhash].js',
		// globalObject: 'this'
	},
	devtool: isProd ? false : '#cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						preserveWhitespace: false
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [ path.join(__dirname, '../src') ]
			}
		]
	},
	plugins: isProd
		? [
				// new CleanWebpackPlugin([ 'dist' ], { root: process.cwd() }),
				new VueLoaderPlugin()
			]
		: [ new VueLoaderPlugin(), new FriendlyErrorsPlugin() ]
}
