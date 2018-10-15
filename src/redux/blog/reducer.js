import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ getsuccess: null, blog:[], message:null, loading:null})

export function blogReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.BLOG_LIST_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                blog:action.payload,
                loading:false
            }
        case actions.BLOG_LIST_ERROR:
            return {
                ...state,
                getsuccess:false,
                blog:[],
                message:action.payload,
                loading:false
            }
        default:
            return state
    }
}