import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'

import { loadState, saveState } from './localStorage'
import * as reducers from './ducks'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(logger))

const persistedState = loadState()
const store = createStore(combineReducers(reducers), persistedState, enhancer)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
