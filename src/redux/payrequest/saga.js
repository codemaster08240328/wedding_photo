import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import PayRequestHelper from "../../service/payrequest"

export function* requestWeddingPayment() {
  yield takeEvery(actions.WEDDING_PAYMENT_REQUEST, function*({payload}) {
    const  param = Object.assign({},payload)
    const result = yield call(PayRequestHelper.requestWeddingPayment, param)
    if (result && !result.error) {
      yield put({
        type: actions.WEDDING_PAYMENT_REQUEST_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.WEDDING_PAYMENT_REQUEST_ERROR,
          payload:result.error
        })
    }
  })
}

export function* requestWeddingPay(){
  yield takeEvery(actions.REQUEST_WEDDING_PAY, function*({payload}) {
    const  param = Object.assign({},payload)
    const result = yield call(PayRequestHelper.requestWeddingPay, param)
    if (result && !result.error) {
      yield put({
        type: actions.REQUEST_WEDDING_PAY_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
        type: actions.REQUEST_WEDDING_PAY_ERROR,
        payload:result.error
      })
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(requestWeddingPayment),
    fork(requestWeddingPay)
  ])
}