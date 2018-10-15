import { all, takeEvery, put, call, fork } from "redux-saga/effects"
import actions from "./action"
import BlogHelper from "../../service/blog"

export function* getBlogList() {
    
    yield takeEvery(actions.GET_BLOG_LIST, function*({payload}) {
        console.log('call....');
        console.log(payload);
        const result = yield call(BlogHelper.getBlogList, payload)
        if (result && !result.error) {
            yield put({
                type: actions.BLOG_LIST_SUCCESS,
                payload: result
            })
        } else {
            yield put({ 
                type: actions.BLOG_LIST_ERROR,
                payload:result.error
            })
        }
    })
}
export default function* rootSaga() {
    yield all([
      fork(getBlogList)
    ])
  }