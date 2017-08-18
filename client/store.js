import {
  applyMiddleware,
  createStore
} from 'redux'

import Immutable from 'immutable'
import { composeWithDevTools } from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import rootSaga from './sagas/rootSaga'
import { routerMiddleware } from 'react-router-redux'

const logger = createLogger({
  predicate: () => DEBUG,
  stateTransformer: (state) => {
    const newState = {}
    for (const i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[ i ])) {
        newState[ i ] = state[ i ].toJS()
      } else {
        newState[ i ] = state[ i ]
      }
    }

    return newState
  },
  actionTransformer: action => {
    return {
      ...action,
      type: action.type.toString()
    }
  }
})

const transformInitialState = (state) => {
  if (state) {
    const {
      converter,
      ...rest
    } = state
    return {
      converter: Immutable.fromJS(converter),
      ...rest
    }
  }
}

let store = null

export function configureStore (history, initialState) {
  // don't recreate store - react-redux Provider isn't happy about it
  if (store === null) {
    const sagaMiddleware = createSagaMiddleware()

    store = createStore(
      reducer,
      transformInitialState(initialState),
      composeWithDevTools(
        applyMiddleware(
          sagaMiddleware,
          routerMiddleware(history),
          logger
        )
      ))

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept([ './reducer' ], () => {
        store.replaceReducer(reducer)
      })
    }

    sagaMiddleware.run(rootSaga)
  }

  return store
}
