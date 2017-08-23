import {
  FETCH_RATES_SUCCESS,
  SET_FROM_CURRENCY_INDEX,
  SET_TO_CURRENCY_INDEX,
  SET_AMOUNT_TO_CONVERT
} from './consts'

import { fromJS } from 'immutable'
import { isNumeric, isEmptyAmount } from '../../utils'

export const initialState = fromJS({
  currencies: [
    `GBP`,
    `EUR`,
    `USD`
  ],
  rates: {},
  fromCurrencyIndex: 0,
  toCurrencyIndex: 1,
  amountToConvert: null,
  balance: {
    currencyIndex: 0,
    amount: 10000
  }
})

const isValidAmountToConvert = amount =>
  isEmptyAmount(amount) || (isNumeric(amount) && amount >= 0)

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
      return state.set(`fromCurrencyIndex`, action.payload)
    case SET_TO_CURRENCY_INDEX:
      return state.set(`toCurrencyIndex`, action.payload)
    case SET_AMOUNT_TO_CONVERT: {
      const amountToConvert = action.payload
      return isValidAmountToConvert(amountToConvert)
        ? state.set(`amountToConvert`, amountToConvert)
        : state
    }
    default:
      return state
  }
}
