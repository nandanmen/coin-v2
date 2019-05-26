import { createStore, combineReducers } from 'redux'
import { loadState, saveState } from './localStorage'
import * as reducers from './ducks'

const persistedState = loadState()
const store = createStore(
  combineReducers(reducers),
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
