import reducer, { initialState } from './index'
import { expect } from 'chai'
import { fetchRatesSuccess } from './actions'
import { fromJS } from 'immutable'

describe(`converter reducer`, () => (
  it('should put rates into state on FETCH_RATES_SUCCESS action', () => {
    const base1 = `RUB`
    const rates1 = { a: 1 }
    const base2 = `USD`
    const rates2 = { b: 2 }
    const base3 = `EUR`
    const rates3 = { c: 2 }

    const payload = [ {
      base: base1,
      rates: rates1
    }, {
      base: base2,
      rates: rates2
    }, {
      base: base3,
      rates: rates3
    } ]

    const newState = reducer(initialState, fetchRatesSuccess(payload))
    expect(newState).to.equal(initialState.set(`rates`, fromJS({
      [base1]: rates1,
      [base2]: rates2,
      [base3]: rates3
    })))
  })
))
