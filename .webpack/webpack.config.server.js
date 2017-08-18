const path = require('path')
const config = require('config')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const {
  cssLoader,
  serverStyles,
  fileLoader
} = require('./webpack.config.shared')

module.exports = {
  context: path.resolve(__dirname, '..'),
  target: 'node',
  devtool: config.isProduction ? false : '#cheap-module-inline-source-map',
  watch: !config.isProduction,
  entry: {
    server: [
      'source-map-support/register',
      path.resolve('server', 'index')
    ]
  },
  output: {
    path: config.source,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      },
      {
        test: /\.css$/,
        use: serverStyles([ cssLoader, 'postcss-loader' ])
      },
      fileLoader
    ]
  },
  externals: [ nodeExternals() ],
  resolve: {
    extensions: [ '.js' ],
    modules: [ 'node_modules' ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      window: {},
      DEBUG: false
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
