import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ getsuccess: null, proposal:[], message:null, loading:null })
const initState_ = Immutable({ getsuccess: null, proposalDetails:[], message:null, loading:null })
const initState_status = Immutable({ invoicestatus:null})
const initState_change = Immutable({propChange:null});


export function proposalReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.GET_PROPOSAL_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                proposal:action.payload,
                loading:false
            }
        case actions.GET_PROPOSAL_ERROR:
            return {
                ...state,
                getsuccess:false,
                proposal:[],
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
}

export function proposalDetails(state = initState_, action = {}){
    switch (action.type) {
        case actions.GET_PROPOSAL_DETAIL_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                proposalDetails:action.payload,
                loading:false
            }
        case actions.GET_PROPOSAL_DETAIL_ERROR:
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

export function invoicestatus(state = initState_status, action = {}){
    switch (action.type) {
        case actions.GET_PROPOSAL_STATUS:
            return {
                ...state,
                invoicestatus:action.payload
            }
        case actions.GET_PROPOSAL_STATUS_ERROR:
            return initState_status
        default:
            return state
    }
}

export function propChange(state = initState_change, action={}){
    switch (action.type){
        case actions.PROPOSAL_CHANGE_SUCCESS:
            return {
                ...state,
                propChange:action.payload
            }
        case actions.PROPOSAL_CHANGE_ERROR:
            return {
                ...state,
                propChange:action.payload
            }
        default:
            return state
    }
}
