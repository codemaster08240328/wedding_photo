import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import OrderHelper from "../../service/order"

export function* getOrder() {
  yield takeEvery(actions.GETTING_ORDER, function*({payload}) {
    const  userInfo = payload
    const result = yield call(OrderHelper.getOrderList, userInfo)
    if (result && !result.error) {
      yield put({
        type: actions.GET_ORDER_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.GET_ERROR,
          payload:result.error
        })
    }
  })
}

export function* getOrderDetails(){
    yield takeEvery(actions.GET_ORDERDETAILS, function*({payload}){
        const result = yield call(OrderHelper.getOrderDetails, payload)
        if(result && !result.error){
            yield put({
                type:actions.GET_ORDERDETAILS_SUCCESS,
                payload:result
            })
        }else{
            yield put({
                type:actions.GET_ORDERDETAILS_ERROR,
                payload:result.error
            })
        }
    })
}

export function* getInvoice() {
    yield takeEvery(actions.GETTING_INVOICE, function*({payload}) {
        const result = yield call(OrderHelper.getInvoiceList, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_INVOICE_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_INVOICE_ERROR,
                payload:result.error
            })
        }
    })
}

export function* getInvoiceStatus() {
    yield takeEvery(actions.GETTING_INVOICE_STATUS, function*({payload}) {
        const result = yield call(OrderHelper.getInvoiceStatus, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_INVOICE_STATUS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_INVOICE_STATUS_ERROR,
                payload:result.error
            })
        }
    })
}

export default function* rootSaga() {
  yield all([
    fork(getOrder),
    fork(getInvoice),
    fork(getInvoiceStatus),
    fork(getOrderDetails),
  ])
}
