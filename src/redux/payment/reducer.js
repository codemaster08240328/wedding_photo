import actions from "./action"
import Immutable from 'seamless-immutable';

const eng_initState = Immutable({ success: null, paymenthistory:[], message:null, loading:null })
export function engPaymentHistoryReducer(state = eng_initState, action = {}){
    switch(action.type){
        case actions.GETTING_ENGAGEMENT_PAYMENT_HISTORY:
            return{
                ...state,
                success: null,
                loading: true
            }
        case actions.ENGAGEMENT_PAYMENT_HISTORY_GET_SUCCESS:
            return {
                ...state,
                success:true,
                paymenthistory: action.payload,
                loading:false,
            }
        case actions.ENGAGEMENT_PAYMENT_HISTORY_GET_ERROR:
            return {
                ...state,
                success:false,
                paymenthistory:[],
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
    

}

const wedding_initState = Immutable({ success: null, paymenthistory:[], message:null, loading:null })
export function weddingPaymentHistoryReducer(state = wedding_initState, action = {}){
    switch(action.type){
        case actions.GETTING_WEDDING_PAYMENT_HISTORY:
            return{
                ...state,
                success: null,
                loading: true
            }
        case actions.WEDDING_PAYMENT_HISTORY_GET_SUCCESS:
            return {
                ...state,
                success:true,
                paymenthistory: action.payload,
                loading:false,
            }
        case actions.WEDDING_PAYMENT_HISTORY_GET_ERROR:
            return {
                ...state,
                success:false,
                paymenthistory:[],
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
    

}
