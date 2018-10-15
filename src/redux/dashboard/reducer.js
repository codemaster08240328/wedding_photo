import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ success: null, dashboard:null, message:null, loading:null })
export function dashReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.GET_DASHBOARD:
            return {
                ...state,
                loginsuccess:true,
                user:action.payload,
                loading:false
            }
        case actions.GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                loginsuccess:false,
                dashboard:action.payload,
                loading:false,
            }
        case actions.GET_DASHBOARD_ERROR:
            return{
                ...state,
                message:action.payload
            }
        default:
            return state
    }
}