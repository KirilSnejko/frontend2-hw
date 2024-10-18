const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
	SRC: path.join(__dirname, 'src'),
	DIST: path.join(__dirname, 'dist'),
	PUBLIC: path.join(__dirname, 'public'),
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.resolve(PATHS.SRC, 'index.js'),
	output: {
		filename: '[name].[fullhash].js',
		assetModuleFilename: 'images/[name][ext]',
		publicPath: '/',
		path: path.resolve(PATHS.DIST),
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.css', '.scss'],
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'), // Explicitly specify Dart Sass
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(PATHS.PUBLIC, 'index.html'),
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
			chunkFilename: '[id].css',
		}),
	],
};
