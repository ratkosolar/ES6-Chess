const path = require('path');
require('@babel/register');

const config = {
  entry: './src/chess.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'chess.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  watch: true,
  devtool: 'source-map'
};

module.exports = config;
