
import actions from "./action"
import Immutable from 'seamless-immutable';

const initState_wp = Immutable({ getsuccess: null, worksheet:null, message:null, loading:null })
const initState_ep = Immutable({ getsuccess: null, worksheet:null, message:null, loading:null })
const initState_wv = Immutable({ getsuccess: null, worksheet:null, message:null, loading:null })


export function wpworksheet(state = initState_wp, action={}) {
    switch (action.type) {
        case actions.GET_WPWORKSHEET_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                worksheet:action.payload,
                loading:false
            }
        case actions.GET_WPWORKSHEET_ERROR:
            return {
                ...state,
                getsuccess:false,
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
}

export function epworksheet(state = initState_ep, action = {}){
    switch (action.type) {
        case actions.GET_EPWORKSHEET_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                worksheet:action.payload,
                loading:false
            }
        case actions.GET_EPWORKSHEET_ERROR:
            return {
                ...state,
                getsuccess:false,
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
}

export function wvworksheet(state = initState_wv, action = {}){
    switch (action.type) {
        case actions.GET_WVWORKSHEET_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                worksheet:action.payload,
                loading:false
            }
        case actions.GET_WVWORKSHEET_ERROR:
            return {
                ...state,
                getsuccess:false,
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
}
