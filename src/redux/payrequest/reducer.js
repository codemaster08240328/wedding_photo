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