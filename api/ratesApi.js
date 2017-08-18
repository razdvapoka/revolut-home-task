import axios from 'axios'
import config from 'config'

const getRates = (base) => axios.get(
  `${config.ratesApiUrl}/latest`, {
    params: {
      base
    }
  })

const getMultipleRates = (currencies) => Promise.all(
  currencies.map(getRates)
)

export default {
  getRates,
  getMultipleRates
}
