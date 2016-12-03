var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CONSTS = require("./constants.js");
module.exports = {
	context: __dirname,
	entry: './src/main.js',
	output: {
   filename: 'js/log.js',
	 path: path.join(__dirname, './dis'), // выходная директория
	},
	watch: true,
	devtool: "cheap-module-source-map",
	module: {
      loaders: [
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          }
      ]
  },
	plugins: [
		new ExtractTextPlugin('./css/style.css'),
		new webpack.DefinePlugin(CONSTS),
	]
};
