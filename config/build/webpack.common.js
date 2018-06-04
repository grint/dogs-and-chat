const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin'); 
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'styles': './src/css/global.scss',
		'scripts': './src/js/scripts',
		'app': './src/main.ts',
	},

	resolve: {
		extensions: [
			'.js', '.ts'
		]
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [ 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ]
			},
			{
				/**
				 * JS LOADER
				 * Transpile .js files using babel-loader
				 * Compiles ES6 and ES7 into ES5 code
				 * Reference: https://github.com/babel/babel-loader
				 */
				 test: /\.js$/,
				 loader: 'babel-loader',
				 query: {
					 presets: ['es2015']
				 }
			},
			{
				/**
				 * HTML LOADER
				 * Allow loading html through js
				 * Reference: https://github.com/webpack-contrib/raw-loader
				 */
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				/**
				 * FILE LOADER
				 * Copy listed files to output
				 * Reference: https://github.com/webpack-contrib/file-loader
				 */
				test: /\.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
				use: 'file-loader?name=assets/[name].[hash].[ext]'
			},
			{ 
				/**
				 * PUG LOADER
				 * Allow loading PUG through JS
				 * Reference: https://www.npmjs.com/package/pug-html-loader
				 */
				test: /\.(pug|jade)$/, 
				use: ['raw-loader', 'pug-html-loader'] 
			},
			{ 
				test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, 
				loader: 'imports-loader?jQuery=jquery' 
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000&mimetype=application/font-woff',
			},

			/**
			 * SASS/CSS LOADER
			 * Allow loading SASS/CSS through JS
			 * Postprocess CSS with PostCSS plugin
			 * Reference: https://github.com/webpack/css-loader
			 * Reference: https://github.com/postcss/postcss-loader
			 * Reference: https://www.npmjs.com/package/sass-loader
			 */

			{
			  test: /\.css$/, 
			  use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.scss$/,
				exclude: [ /node_modules/, helpers.root('src/css', 'global') ],
				use: [ 'to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
			},
			{
				test: /global\.scss$/,
				use: ExtractTextPlugin.extract({
					// fallback: 'style-loader',
					use: 'css-loader!sass-loader'
				})
			},
			{
				test: require.resolve('jquery'),
				use: [
					{
						loader: 'expose-loader',
						options: 'jQuery'
					},
					{
						loader: 'expose-loader',
						options: '$'
					}
				]
			}
		]
	},

	/**
	 * Plugins
	 * Reference: http://webpack.github.io/docs/configuration.html#plugins
	 */
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
			Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
			Button: 'exports-loader?Button!bootstrap/js/dist/button',
			Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
			Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
			Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
			Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
			Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: 'exports-loader?Util!bootstrap/js/dist/util'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: [ 'app', 'vendor', 'polyfills' ]
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),

		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			helpers.root('src'),
			{}
		),
	]
};