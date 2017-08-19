import {
  FETCH_RATES_FAILURE,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_REQUEST,
  SET_FROM_CURRENCY_INDEX,
  SET_TO_CURRENCY_INDEX,
  SET_AMOUNT_TO_CONVERT
} from './consts'
import { createAction } from 'redux-actions'

export const fetchRatesRequest = createAction(FETCH_RATES_REQUEST)
export const fetchRatesSuccess = createAction(FETCH_RATES_SUCCESS)
export const fetchRatesFailure = createAction(FETCH_RATES_FAILURE)
export const setFromCurrencyIndex = createAction(SET_FROM_CURRENCY_INDEX)
export const setToCurrencyIndex = createAction(SET_TO_CURRENCY_INDEX)
export const setAmountToConvert = createAction(SET_AMOUNT_TO_CONVERT)
