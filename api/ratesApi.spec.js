/* eslint no-unused-expressions: 0 */

import ratesApi from './ratesApi'
import { expect } from 'chai'
import httpStatusCodes from 'http-status-codes'

describe(`ratesApi`, () => {
  it(`should fetch rates`, function * () {
    const getRatesResponse = yield ratesApi.getRates()
    expect(getRatesResponse.status).to.equal(httpStatusCodes.OK)
    expect(getRatesResponse.data).to.be.an(`object`).that.is.not.empty
  })
})
