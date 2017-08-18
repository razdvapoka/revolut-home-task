import converterSaga from './converterSaga'

export default function * rootSaga () {
  yield [
    converterSaga()
  ]
}
