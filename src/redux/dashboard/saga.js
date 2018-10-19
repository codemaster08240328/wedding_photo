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

export function* getEngagement(){
  yield takeEvery(actions.GET_ENGAGEMENT, function*({payload}){
    const param = Object.assign({}, payload)
    const result = yield call(DashHelper.getEngagement, param)
    if(result && !result.error){
      yield put({
        type: actions.ENGAGEMENT_SUCCESS,
        payload: result
      })
    } else {
      yield put({
        type: actions.ENGAGEMENT_ERROR,
        payload: result.error
      })
    }
  })
}

export function* getWeddingWorksheet(){
  yield takeEvery(actions.GET_WEDDING_WORKSHEET, function*({payload}){
    const param = Object.assign({}, payload)
    const result = yield call(DashHelper.getWeddingWorksheet, param)
    if(result && !result.error){
      yield put({
        type: actions.WEDDING_WORKSHEET_SUCCESS,
        payload: result
      })
    } else {
      yield put({
        type: actions.WEDDING_WORKSHEET_ERROR,
        payload: result.error
      })
    }
  })
}

export function* getEngagementWorksheet(){
  yield takeEvery(actions.GET_ENGAGEMENT_WORKSHEET, function*({payload}){
    const param = Object.assign({}, payload)
    const result = yield call(DashHelper.getEngagementWorksheet, param)
    if(result && !result.error){
      yield put({
        type: actions.ENGAGEMENT_WORKSHEET_SUCCESS,
        payload: result
      })
    } else {
      yield put({
        type: actions.ENGAGEMENT_WORKSHEET_ERROR,
        payload: result.error
      })
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(getDashBoard),
    fork(getEngagement),
    fork(getWeddingWorksheet),
    fork(getEngagementWorksheet)
  ])
}
