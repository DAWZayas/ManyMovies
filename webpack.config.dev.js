'use strict';

let webpack = require('webpack');
let path = require('path');
let friendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  module: {
    loaders:
    [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel', 'eslint' ]
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions'
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=10000000'
      }
    ]
  },
  eslint: {
    formatter: friendlyFormatter,
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
