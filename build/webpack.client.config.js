const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

const cssLoaderSet = isProd
	? [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
	: [ 'vue-style-loader', 'css-loader', 'less-loader' ]

const config = merge(base, {
	entry: { app: './src/entry-client.js' },
	module: {
		rules: [
			{
				test: /\.less$/,
				use: cssLoaderSet
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"client"'
		}),
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].[hash].css' : '[name].css',
			chunkFilename: isProd ? '[id].[hash].css' : '[id].css'
		}),
		new VueSSRClientPlugin()
	]
})

if (isProd) {
	config.optimization = {
		// minimizer: true,
		providedExports: true,
		usedExports: true,
		//识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
		//依赖于optimization.providedExports和optimization.usedExports
		sideEffects: true,
		//取代 new webpack.optimize.ModuleConcatenationPlugin()
		concatenateModules: true,
		//取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
		noEmitOnErrors: true,
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: -20,
					chunks: 'all'
				},
				styles: {
					name: 'styles',
					test: m => m.constructor.name === 'CssModule',
					chunks: 'all',
					minChunks: 1,
					enforce: true
				}
			}
		}
	}
}

module.exports = config
