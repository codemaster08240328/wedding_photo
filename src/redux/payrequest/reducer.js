import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ success: null, weddingpayreq: {}, message:null, loading:null })
export function weddingPaymentRequestReducer(state = initState, action = {}){
    switch(action.type){
        case actions.WEDDING_PAYMENT_REQUEST:
            return{
                ...state,
                success: null,
                weddingpayreq: {},
                message: null,
                loading: true
            }
        case actions.WEDDING_PAYMENT_REQUEST_SUCCESS:
            return {
                ...state,
                success: true,
                weddingpayreq: action.payload,
                message: null,
                loading: false,
            }
        case actions.WEDDING_PAYMENT_REQUEST_ERROR:
            return {
                ...state,
                success: false,
                weddingpayreq: {},
                message: action.payload,
                loading: false,
            }
        case actions.IF_SECOND_SHOOTER: 
            return {
              ...state,
              weddingpayreq: Object.assign({}, state.weddingpayreq, action.payload)
            }
        case actions.SECOND_SHOOTER_DETAIL:
            return {
              ...state,
              weddingpayreq: Object.assign({}, state.weddingpayreq, action.payload)
            }
        default:
            return state
    }
}

const initState_Engage = Immutable({ success: null, engagementPayReq: {}, message:null, loading:null })
export function engagementPaymentRequestReducer(state = initState_Engage, action = {}){
    switch(action.type){
        case actions.ENGAGEMENT_PAYMENT_REQUEST:
            return{
                ...state,
                success: null,
                engagementPayReq: {},
                message: null,
                loading: true
            }
        case actions.ENGAGEMENT_PAYMENT_REQUEST_SUCCESS:
            return {
                ...state,
                success: true,
                engagementPayReq: action.payload,
                message: null,
                loading: false,
            }
        case actions.ENGAGEMENT_PAYMENT_REQUEST_ERROR:
            return {
                ...state,
                success: false,
                engagementPayReq: {},
                message: action.payload,
                loading: false,
            }
        case actions.NEXT_STEP: 
            return {
              ...state,
              engagementPayReq: Object.assign({}, state.engagementPayReq, action.payload)
            }
        default:
            return state
    }
}

const initState_Result = Immutable({success: null, weddingpayres: {}, message: null, loading: null})

export function weddingPayResultReducer(state=initState_Result, action = {}){
    switch(action.type){
        case actions.REQUEST_WEDDING_PAY:
            return{
                ...state,
                success: null,
                weddingpayres: {},
                message: null,
                loading: true
            }
        case actions.REQUEST_WEDDING_PAY_SUCCESS:
            return {
                ...state,
                success: true,
                weddingpayres: action.payload,
                message: null,
                loading: false,
            }
        case actions.REQUEST_WEDDING_PAY_ERROR:
            return {
                ...state,
                success: false,
                weddingpayres: {},
                message: action.payload,
                loading: false,
            }
        default:
            return state
    }
}