import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import ProposalHelper from "../../service/proposal"

export function* getProposal() {
    yield takeEvery(actions.GETTING_PROPOSAL, function*({payload}) {
        const result = yield call(ProposalHelper.getProposalList, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_PROPOSAL_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_PROPOSAL_ERROR,
                payload:result.error
            })
        }
    })
}

export function* getProposalDetail() {
    yield takeEvery(actions.GETTING_PROPOSAL_DETAIL, function*({payload}) {
        const result = yield call(ProposalHelper.getProposalOrderDetail, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_PROPOSAL_DETAIL_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_PROPOSAL_DETAIL_ERROR,
                payload:result.error
            })
        }
    })
}

export function* getProposalStatus() {
    yield takeEvery(actions.GETTING_PROPOSAL_STATUS, function*({payload}) {
        const result = yield call(ProposalHelper.getProposalStatus, payload)
        if (result && !result.error) {
            yield put({
                type: actions.GET_PROPOSAL_STATUS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.GET_PROPOSAL_STATUS_ERROR,
                payload:result.error
            })
        }
    })
}

export function* changeProposalRequest(){
    yield takeEvery(actions.PROPOSAL_CHANGE_REQUEST, function*({payload}){
        const result = yield call(ProposalHelper.changeProposalRequest, payload)
        if(result && !result.error){
            alert(result.success)
            yield put({
                type:actions.PROPOSAL_CHANGE_SUCCESS,
                payload:result.success
            })
        }else{
            alert(result.error)
            yield put({
                type:actions.PROPOSAL_CHANGE_ERROR,
                payload:result.error
            })
        }
    })
}

export default function* rootSaga() {
  yield all([
    fork(getProposal),
    fork(getProposalDetail),
    fork(getProposalStatus),
    fork(changeProposalRequest),
  ])
}
