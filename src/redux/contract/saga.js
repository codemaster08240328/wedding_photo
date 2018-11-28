import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ContractHelper from "../../service/contract"

export function* getPendingContract() {
  yield takeEvery(actions.GET_PENDING_CONTRACT, function*({payload}) {
    const  userInfo  = payload
    const result = yield call(ContractHelper.getPendingContract, userInfo)
    if (result && !result.error) {
      yield put({
        type: actions.GET_PENDING_CONTRACT_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
          type: actions.GET_PENDING_CONTRACT_ERROR,
          payload:result.error
        })
    }
  })
}
export function* getContractDetail(){
  yield takeEvery(actions.GET_CONTRACT_DETAIL, function*({payload}) {
    const  userInfo  = payload
    const result = yield call(ContractHelper.getContractDetail, userInfo)
    if (result && !result.error) {
      yield put({
        type: actions.GET_CONTRACT_DETAIL_SUCCESS,
        payload: result
      })
    } else {
      yield put({ 
        type: actions.GET_CONTRACT_DETAIL_ERROR,
        payload:result.error
      })
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(getPendingContract)
  ])
}