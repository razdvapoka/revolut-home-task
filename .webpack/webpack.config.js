const path = require('path')
const config = require('config')
const webpack = require('webpack')
const SaveAssetsJsonPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const {
  cssLoader,
  clientStyles,
  fileLoader
} = require('./webpack.config.shared')

module.exports = {
  context: path.resolve(__dirname, '..'),
  // Enter watch mode, which rebuilds on file change.
  watch: !config.isProduction,
  devtool: config.isProduction ? false : '#cheap-module-inline-source-map',
  entry: {
    app: [ path.resolve('client', 'index') ]
  },
  output: {
    path: config.dist,
    filename: config.isProduction ? '[name]-[hash].js' : '[name].js',
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          ...(config.isProduction ? [] : [ 'react-hot-loader/webpack' ]),
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: !config.isProduction
                ? []
                : [
                  'transform-remove-console',
                  'transform-react-inline-elements'
                ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: clientStyles([ cssLoader, 'postcss-loader' ])
      },
      fileLoader
    ]
  },
  resolve: {
    alias: {
      'config$': path.resolve(__dirname, '..', '.config', 'browser.js')
    },
    extensions: [ '.js' ],
    modules: [ 'node_modules' ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  plugins: [
    new SaveAssetsJsonPlugin({
      path: config.dist,
      update: true
    }),
    new webpack.DefinePlugin({
      DEBUG: !config.isProduction,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.ProgressPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return module.context && /node_modules/.test(module.context)
      }
    }),
    ...(config.isProduction
      ? [
        // Production plugins
        new BabiliPlugin({ sourceMap: false }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({
          filename: '[name]-[hash].css',
          allChunks: true
        })
      ] : [
        // Development plugins
        // Switch loaders to debug mode.
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      ]
    )
  ]
}
