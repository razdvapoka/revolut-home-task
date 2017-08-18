import 'babel-polyfill'
import asset from './asset'
import config from 'config'
import express from 'express'
import morgan from 'morgan'
import proxy from 'http-proxy-middleware'
import router from './router'

const app = express()
app.locals.asset = asset

app.use(morgan(`dev`))

app.get(`/ping`, (req, res) => res.send(`ok`))

if (config.isProduction) {
  app.use(`/assets`, express.static(config.dist))
} else {
  app.use(
    `/assets`,
    proxy(`http://localhost:${config.devServerPort}/assets`)
  )
}

app.use(router)

export default (port) => {
  app.listen(port, () => {
    console.log(`App is available at http://localhost:${port}`)
  })
}
