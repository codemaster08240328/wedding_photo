import { all } from "redux-saga/effects"

import authSagas from "./auth/saga"
import orderSagas from './order/saga'
import worksheetSagas from './worksheet/saga'
import proposalSagas from './proposal/saga'
import blogSagas from './blog/saga'
import dashSagas from './dashboard/saga'
import paymentSagas from './payment/saga'

export default function* rootSaga(getState) {
  yield all([authSagas(), orderSagas(), worksheetSagas(), proposalSagas(), blogSagas(), dashSagas(), paymentSagas()])
}
