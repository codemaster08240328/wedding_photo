import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import WorksheetHelper from "../../service/worksheet"

export function* getWpWorksheet() {
  yield takeEvery(actions.GETTING_WPWORKSHEET, function*({payload}) {
    const result = yield call(WorksheetHelper.getWpworksheet, payload)
    if (result && !result.error) {
      yield put({
        type: actions.GET_WPWORKSHEET_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.GET_WPWORKSHEET_ERROR,
          payload:result.error
        })
    }
  })
}

export function* getEpWorksheet() {
    yield takeEvery(actions.GETTING_EPWORKSHEET, function*({payload}) {
        const result = yield call(WorksheetHelper.getEpworksheet, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_EPWORKSHEET_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_EPWORKSHEET_ERROR,
                payload:result.error
            })
        }
    })
}

export function* getWvWorksheet() {
    yield takeEvery(actions.GETTING_WVWORKSHEET, function*({payload}) {
        const result = yield call(WorksheetHelper.getWvworksheet, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_WVWORKSHEET_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_WVWORKSHEET_ERROR,
                payload:result.error
            })
        }
    })
}

export default function* rootSaga() {
  yield all([
    fork(getWpWorksheet),
    fork(getWvWorksheet),
    fork(getEpWorksheet)
  ])
}
