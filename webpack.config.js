var path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
   filename: 'log.js',
	 path: 'dis/js', // выходная директория
 },
 watch: true,
 devtool: "source-map"
};
