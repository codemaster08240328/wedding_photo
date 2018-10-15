import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import DashHelper from "../../service/dashboard"
import pay from "../../pages/order/pay";

export function* getDashBoard() {
  yield takeEvery(actions.GET_DASHBOARD, function*({payload}) {
    const  userInfo  =Object.assign({}, payload)
    const result = yield call(DashHelper.getDashBoard, userInfo)
    if (result && !result.error) {
      yield put({
        type: actions.GET_DASHBOARD_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.GET_DASHBOARD_ERROR,
          payload:result.error
        })
    }
  })
}


export default function* rootSaga() {
  yield all([
    fork(getDashBoard),
  ])
}
