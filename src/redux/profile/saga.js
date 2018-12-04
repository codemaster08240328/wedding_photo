import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ProfileHelper from "../../service/profile"

export function* getProfile() {
    yield takeEvery(actions.GETTING_PROFILE, function*({payload}) {
        const result = yield call(ProfileHelper.getProfile, payload)
        if (result && !result.error) {
          yield put({
              type: actions.GET_PROFILE_SUCCESS,
              payload: result
          })
        } else {
          yield put({ 
              type: actions.GET_PROFILE_ERROR,
              payload:result.error
          })
        }
    })
}

export default function* rootSaga() {
  yield all([
    fork(getProfile),
  ])
}
