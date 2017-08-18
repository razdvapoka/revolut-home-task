import axios from 'axios'
import config from 'config'

const getRates = () => axios.get(
  `https://openexchangerates.org/api/latest.json`,
  { params: { app_id: config.ratesAppId } }
)

export default {
  getRates
}
