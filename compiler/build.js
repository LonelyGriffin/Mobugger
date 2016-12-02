var path = require('path');
var webpack = require('webpack');
var config = {
	context: path.join(__dirname, '..'), // исходная директория
	entry: './src/main.js', 
	output: {
   filename: 'log.js',
		path: 'dis/js' // выходная директория
	}
};
var compiler = webpack(config);
compiler.run(function (err, stats) {
	if(err){console.log(err); }
  else{
    console.log(stats.toJson())
  };
});
