var path = require('path')

var config = require('config')
var forever = require('forever')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

var webpack = require('webpack')

// Recreate dist folder
rimraf.sync(config.dist)
mkdirp.sync(config.dist)

// Recreate source folder
rimraf.sync(config.source)
mkdirp.sync(config.source)

var WebpackDevServer = require('webpack-dev-server')
var clientConfig = require('../.webpack/webpack.config')
var serverConfig = require('../.webpack/webpack.config.server')

clientConfig.entry.app.unshift(
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${config.devServerPort}`,
  'webpack/hot/only-dev-server'
)
clientConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)

var clientCompiler = webpack(clientConfig)
var serverCompiler = webpack(serverConfig)
var webpackDevServer = new WebpackDevServer(clientCompiler, {
  hot: true,
  inline: true,
  stats: {
    colors: true,
    chunks: false
  },
  publicPath: config.publicPath
})

webpackDevServer.listen(config.devServerPort)

var clientCompilerDone = false
var serverCompilerDone = false

// wait til webpack starts
clientCompiler.plugin('done', onClientCompilerDone)

function onClientCompilerDone () {
  if (!clientCompilerDone) {
    clientCompilerDone = true
    serverCompiler.watch(1000, onServerCompilerDone)
  }
}

function onServerCompilerDone () {
  if (!serverCompilerDone) {
    serverCompilerDone = true
    setTimeout(runApplications, 1000)
  }
}

function runApplications () {
  var child = new (forever.Monitor)(path.resolve(__dirname, 'start.js'), {
    env: {
      NODE_CONFIG_DIR: path.resolve(__dirname, '..', '.config')
    },
    watch: true,
    watchDirectory: path.resolve(__dirname, '..', 'server'),
    watchIgnore: 'dist'
  })

  child.start()
}
