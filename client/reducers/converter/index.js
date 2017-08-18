import {
  FETCH_RATES_SUCCESS,
  SET_FROM_CURRENCY_INDEX,
  SET_TO_CURRENCY_INDEX
} from './consts'
import { fromJS } from 'immutable'

export const initialState = fromJS({
  currencies: [
    `GBP`,
    `EUR`,
    `USD`
  ],
  rates: {},
  from: {
    currencyIndex: 0,
    amount: null
  },
  to: {
    currencyIndex: 1,
    amount: null
  },
  balance: {
    currencyIndex: 0,
    amount: 10000
  }
})

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATES_SUCCESS: {
      const rawRates = action.payload // an array of rates' api responses
      const rates = rawRates.reduce((result, r) => ({
        ...result,
        [r.base]: r.rates
      }), {})
      return state.set(`rates`, fromJS(rates))
    }
    case SET_FROM_CURRENCY_INDEX:
      return state.setIn([ `from`, `currencyIndex` ], action.payload)
    case SET_TO_CURRENCY_INDEX:
      return state.setIn([ `to`, `currencyIndex` ], action.payload)
    default:
      return state
  }
}
