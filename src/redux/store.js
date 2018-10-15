import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"
import * as reducers from "./reducers"
import sagas from "./sagas"
import logger from 'redux-logger';


const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, sagaMiddleware, logger]

const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(...middlewares))
)

sagaMiddleware.run(sagas)
export default store