const autoprefixer = require(`autoprefixer`)
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    autoprefixer(),
    cssnano({
      safe: true,
      normalizeUrl: false
    })
  ]
}
