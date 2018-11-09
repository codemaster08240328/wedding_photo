import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ success: null, paymenthistory:[], message:null, loading:null })
export function paymentHistoryReducer(state = initState, action = {}){
    switch(action.type){
        case actions.GETTING_PAYMENT_HISTORY:
            return{
                ...state,
                success: null,
                paymenthistory: action.payload,
                loading: true
            }
        case actions.PAYMENT_HISTORY_GET_SUCCESS:
            return {
                ...state,
                success:true,
                paymenthistory: action.payload,
                loading:false,
            }
        case actions.PAYMENT_HISTORY_GET_ERROR:
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
