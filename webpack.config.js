
const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );


module.exports = {
	entry: [ 'babel-polyfill', './src/dev/index.js' ],
	output: {
	path: path.join( __dirname, 'src/dist' ),
	filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			}
    	]
	},
	resolve: {
	extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		port: 3000,
		open: true,
		proxy: {
			'/api': 'http://localhost:8080'
		}
	},
	plugins: [
		new CleanWebpackPlugin([ 'src/dist' ]),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
};