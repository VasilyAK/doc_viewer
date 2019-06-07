// basic vars
const path = require('path');
const webpack = require('webpack');

// additional plugins
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ImagesminPlugin = require('imagemin-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// module settings
module.exports = {
	watch: true,
	mode: "development",

	// базовый путь к проекту
	context: path.resolve(__dirname, 'src'),

	// точки входа pugs_data
	entry: {
		// основной фал приложения
		app: [
			'./index.js', // относительно context
			'./index.scss'
		],
	},

	// путь для собранных файлов
	output: {
		filename: 'pugs_data/index.js',
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			// html
			{
				test: /\.pug$/,
				use: ['pug-loader']
			},

			// pugs_data
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env']
						}
					}
				]
			},

			// scss
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader:'css-loader',
							options: {
								sourceMap:true,
								url: false
							}
						},
						{
							loader:'sass-loader',
							options: {
								sourceMap:true
							}
						},
					],
					fallback: 'style-loader',
				})
			},

			// images
			{
				test: /\.{png|gif|jpg|jpeg}$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					},
					'img-loader'
				]
			},

			// fonts
			{
				test: /\.{woff|woff2|eot|ttf|otf}$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			},

			// svg
			{
				test: /\.svg/,
				loader: 'svg-url-loader'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.pug',
			minify: false
		}),

		new ExtractTextPlugin({
			filename: 'css/index.css'
		}),

		new CopyWebpackPlugin([
			{ from: './images', to: 'images', copyUnmodified: true },
			{ from: './fonts', to: 'fonts' }
		],
			{ignore: [{glob: 'svg/*'}]}
		),

		new CleanWebpackPlugin (),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		port: 9000
	}
};