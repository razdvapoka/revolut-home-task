import {
  FETCH_RATES_SUCCESS,
  SET_AMOUNT_TO_CONVERT,
  SET_FROM_CURRENCY_INDEX,
  SET_RESULTING_AMOUNT,
  SET_TO_CURRENCY_INDEX
} from './consts'

import { fromJS } from 'immutable'
import { isNumeric, isEmptyAmount } from '../../utils'

import {
  fromCurrencyBalanceSelector,
  conversionRateSelector
} from '../../selectors'

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
    0: 1000,
    1: 1000,
    2: 1000
  }
})

const isValidAmountToConvert = (amount, state) =>
  isEmptyAmount(amount) || (
    (isNumeric(amount) && amount >= 0) &&
    fromCurrencyBalanceSelector({ converter: state }) >= amount
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
      const conversionRate = conversionRateSelector({ converter: state })
      const amountToConvert = isEmptyAmount(action.payload)
        ? ``
        : `${action.payload / conversionRate}`
      return setAmountToConvert(amountToConvert, state)
    }
    default:
      return state
  }
}
