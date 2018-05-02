const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/client',
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/dist',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-3', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  devServer: {
    port: 8080,
  },
};
