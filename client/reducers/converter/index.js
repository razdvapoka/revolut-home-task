import {
  FETCH_RATES_SUCCESS,
  SET_AMOUNT_TO_CONVERT,
  SET_FROM_CURRENCY_INDEX,
  SET_RESULTING_AMOUNT,
  SET_TO_CURRENCY_INDEX
} from './consts'

import { fromJS } from 'immutable'
import { isNumeric, isEmptyAmount } from '../../utils'
import { convertedBalanceSelector, rateSelector } from '../../selectors'

export const initialState = fromJS({
  currencies: [
    `GBP`,
    `EUR`,
    `USD`
  ],
  rates: {},
  fromCurrencyIndex: 0,
  toCurrencyIndex: 1,
  amountToConvert: ``,
  balance: {
    currencyIndex: 0,
    amount: 10000
  }
})

const isValidAmountToConvert = (amount, state) =>
  isEmptyAmount(amount) || (
    (isNumeric(amount) && amount >= 0) &&
    convertedBalanceSelector({ converter: state }).fromBalance >= amount
  )

const setAmountToConvert = (amountToConvert, state) => {
  return isValidAmountToConvert(amountToConvert, state)
    ? state.set(`amountToConvert`, amountToConvert)
    : state
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATES_SUCCESS: {
      const rawRates = action.payload // an array of rates' api responses
      const rates = rawRates.reduce((result, r) => ({
        ...result,
        [r.base]: fromJS(r.rates).map(rate =>
          // imitate rates fluctuations
          (parseFloat(rate) + Math.random() * 0.001).toFixed(4)
        )
      }), {})
      return state.set(`rates`, fromJS(rates))
    }
    case SET_FROM_CURRENCY_INDEX:
      return state.set(`fromCurrencyIndex`, action.payload)
    case SET_TO_CURRENCY_INDEX:
      return state.set(`toCurrencyIndex`, action.payload)
    case SET_AMOUNT_TO_CONVERT:
      return setAmountToConvert(action.payload, state)
    case SET_RESULTING_AMOUNT: {
      const rate = rateSelector({ converter: state })
      const amountToConvert = isEmptyAmount(action.payload)
        ? ``
        : `${action.payload / rate}`
      return setAmountToConvert(amountToConvert, state)
    }
    default:
      return state
  }
}
