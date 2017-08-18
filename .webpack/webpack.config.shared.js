const config = require('config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: config.isProduction
    ? { module: true }
    : {
      module: true,
      localIdentName: '[folder]__[local]__[hash:base64:5]'
    }
}

const clientStyles = loaders =>
  config.isProduction
    ? ExtractTextPlugin.extract({ use: loaders })
    : [ 'style-loader', ...loaders ]

const serverStyles = loaders =>
  [ 'isomorphic-style-loader', ...loaders ]

const fileLoader = {
  test: /\.(png|swf|jpg|gif|otf|eot|ttf|woff|woff2|svg|json|ico|mp4)(\?.*)?$/,
  loader: 'file-loader',
  options: { name: '[hash].[ext]' }
}

module.exports = {
  clientStyles,
  serverStyles,
  cssLoader,
  fileLoader
}
