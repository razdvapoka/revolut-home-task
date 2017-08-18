const browserConf = require('./browser')
const path = require('path')
const APP_PORT = Number(process.env.PORT) || 7000
const DEV_PORT = Number(process.env.DEV_PORT) || APP_PORT + 1

module.exports = Object.assign({}, browserConf, {
  dist: path.resolve(__dirname, '..', 'dist'),
  port: APP_PORT,
  devServerPort: DEV_PORT,
  isProduction: false,
  publicPath: '/assets/',
  source: path.resolve(__dirname, '..', 'server', 'dist'),
  ratesApiUrl: `http://api.fixer.io`
})
