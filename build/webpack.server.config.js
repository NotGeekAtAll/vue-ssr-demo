const webpack = require('webpack')
const base = require('./webpack.base.config')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
	target: 'node',
	entry: './src/entry-server.js',
	output: {
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [{
			test: /\.less$/,
			use: [
				'vue-style-loader',
				{
					loader: 'css-loader'
				},
				'less-loader'
			]
		}]
	},
	externals: nodeExternals({
		// do not externalize CSS files in case we need to import it from a dep
		whitelist: /\.css$/
	}),
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			'process.env.VUE_ENV': '"server"'
		}),
		new VueSSRServerPlugin()
	]
})
