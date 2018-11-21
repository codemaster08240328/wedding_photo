import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import AuthHelper from "../../service/auth"

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({payload}) {
    const  userInfo  = payload
    const result = yield call(AuthHelper.authorize, userInfo)
    if (result && !result.error) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.LOGIN_ERROR,
          payload:result.error
        })
    }
  })
}
export function* loginRegister(){
  yield takeEvery(actions.LOGIN_SUCCESS, function*({payload}) {
    console.log('this is called now')
    const param = {
      photog_id: payload.photog_id
    }
    AuthHelper.loginRegister(param)
    // const result = yield call(AuthHelper.loginRegister, param)
  })
}
export function* forgotPassword(){
  yield takeEvery(actions.FORGOT_PASS, function*({payload}){
    const email_address = payload
    const result = yield call(AuthHelper.forgotPassword, email_address)
    if (result && !result.error){
      yield put({
        type:actions.FORGOT_PASS_RESULT,
        payload:result
      })
    }
  })
}
export function* changePassword(){
  yield takeEvery(actions.CHANGE_PASS, function*({payload}){
    const result = yield call(AuthHelper.changePassword, payload)
    if (result && !result.error){
      yield put({
        type:actions.CHANGE_PASS_SUCCESS,
        payload:result
      })
    }else{
      yield put({
        type:actions.CHANGE_PASS_ERROR,
        payload:result.error
      })
    }
  })
}
export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
      
  })
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(logout),
    fork(forgotPassword),
    fork(changePassword),
    fork(loginRegister)
  ])
}
