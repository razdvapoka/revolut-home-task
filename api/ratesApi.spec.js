/* eslint no-unused-expressions: 0 */

import ratesApi from './ratesApi'
import { expect } from 'chai'
import httpStatusCodes from 'http-status-codes'

describe(`ratesApi`, () => {
  describe('getRates', () => {
    it(`should fetch rates`, function * () {
      const currency = `RUB`
      const getRatesResponse = yield ratesApi.getRates(currency)
      expect(getRatesResponse.status).to.equal(httpStatusCodes.OK)
      expect(getRatesResponse.data).to.be.an(`object`).that.is.not.empty
      expect(getRatesResponse.data.base).to.equal(currency)
    })
  })

  describe('getMultipleRates', () => {
    it(`should fetch multiple rates`, function * () {
      const currencies = [ `RUB`, `USD`, `EUR` ]
      const getMultipleRatesResponse = yield ratesApi.getMultipleRates(currencies)
      getMultipleRatesResponse.forEach((response, index) => {
        expect(response.status).to.equal(httpStatusCodes.OK)
        expect(response.data).to.be.an(`object`).that.is.not.empty
        expect(response.data.base).to.equal(currencies[index])
      })
    })
  })
})
