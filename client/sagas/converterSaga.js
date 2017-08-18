import config from 'config'
import { delay } from 'redux-saga'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import ratesApi from '../../api/ratesApi'
import { FETCH_RATES_REQUEST } from '../reducers/converter/consts'
import * as ratesActions from '../reducers/converter/actions'

function * handleFetchRatesRequest () {
  try {
    const currencies = yield select(state => state.converter.get(`currencies`))
    const responses = yield call(ratesApi.getMultipleRates, currencies.toJS())
    yield put(ratesActions.fetchRatesSuccess(responses.map(r => r.data)))
  } catch (error) {
    yield put(ratesActions.fetchRatesFailure(error))
  }
}

function * refetchRates () {
  while (true) {
    yield put(ratesActions.fetchRatesRequest())
    yield delay(config.ratesFetchDelay)
  }
}

export default function * converterSaga () {
  yield [
    takeLatest(FETCH_RATES_REQUEST, handleFetchRatesRequest),
    refetchRates()
  ]
}
