import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import PaymentHelper from "../../service/payment"
import pay from "../../pages/order/pay";

export function* getPaymentHistory() {
  yield takeEvery(actions.GETTING_PAYMENT_HISTORY, function*({payload}) {
    const  param = Object.assign({},payload)
    const result = yield call(PaymentHelper.getPaymentHistory, param)
    if (result && !result.error) {
      yield put({
        type: actions.PAYMENT_HISTORY_GET_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.PAYMENT_HISTORY_GET_ERROR,
          payload:result.error
        })
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(getPaymentHistory)
  ])
}