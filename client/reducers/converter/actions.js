import {
  CONVERT,
  FETCH_RATES_FAILURE,
  FETCH_RATES_REQUEST,
  FETCH_RATES_SUCCESS,
  SET_AMOUNT_TO_CONVERT,
  SET_FROM_CURRENCY_INDEX,
  SET_RESULTING_AMOUNT,
  SET_TO_CURRENCY_INDEX
} from './consts'
import { createAction } from 'redux-actions'

export const convert = createAction(CONVERT)
export const fetchRatesFailure = createAction(FETCH_RATES_FAILURE)
export const fetchRatesRequest = createAction(FETCH_RATES_REQUEST)
export const fetchRatesSuccess = createAction(FETCH_RATES_SUCCESS)
export const setAmountToConvert = createAction(SET_AMOUNT_TO_CONVERT)
export const setFromCurrencyIndex = createAction(SET_FROM_CURRENCY_INDEX)
export const setResultingAmount = createAction(SET_RESULTING_AMOUNT)
export const setToCurrencyIndex = createAction(SET_TO_CURRENCY_INDEX)
