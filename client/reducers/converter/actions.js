import {
  FETCH_RATES_FAILURE,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_REQUEST
} from './consts'
import { createAction } from 'redux-actions'

export const fetchRatesRequest = createAction(FETCH_RATES_REQUEST)
export const fetchRatesSuccess = createAction(FETCH_RATES_SUCCESS)
export const fetchRatesFailure = createAction(FETCH_RATES_FAILURE)
