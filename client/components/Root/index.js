import 'babel-polyfill'
import '../../../server/fav.ico'
import {
  Router,
  browserHistory
} from 'react-router'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from '../../store'
import routes from '../../routes'
import { syncHistoryWithStore } from 'react-router-redux'

const initialState = window.__initialState__

const store = configureStore(browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
)

export default Root
