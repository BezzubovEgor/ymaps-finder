const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    chunkFilename: '[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Place searcher app',
      template: 'index.html',
      inject: true,
      hash: true,
      templateParameters: {
        title: 'foo',
        content: 'bar'
      }
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
