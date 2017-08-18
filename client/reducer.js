import { combineReducers } from 'redux'
import converterReducer from './reducers/converter'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  converter: converterReducer,
  routing: routerReducer
})
