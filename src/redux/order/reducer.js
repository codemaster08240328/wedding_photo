import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ getsuccess: null, order:[], message:null, loading:null })
const initState_ = Immutable({ getsuccess: null, invoice:[], message:null, loading:null })
const initState_status = Immutable({ invoice_status:null})
const orderDetailState = Immutable({ getsuccess: null, orderDetail:[], message:null, loading:null })

// export function orderReducer(state = initState, action={}) {
//     switch (action.type) {
//         case actions.GET_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 getsuccess:true,
//                 order:action.payload,
//                 loading:false
//             }
//         case actions.GET_ERROR:
//             return {
//                 ...state,
//                 getsuccess:false,
//                 order:[],
//                 message:action.payload,
//                 loading:false,
//             }
//         default:
//             return state
//     }
// }

export function orderDetailsReducer(state = orderDetailState, action = {}){
    switch(action.type){
        case actions.GET_ORDERDETAILS_SUCCESS:
            return{
                ...state,
                getsuccess:true,
                orderDetail:action.payload,
                loading:false
            }
        case actions.GET_ORDERDETAILS_ERROR:
            return {
                ...state,
                getsuccess:false,
                orderDetail:[],
                message:action.payload,
                loading:false,
            }
        default:
            return state
    }
    

}

export function invoiceReducer(state = initState_, action = {}){
    switch (action.type) {
        case actions.GET_INVOICE_SUCCESS:
            return {
                ...state,
                getsuccess:true,
                invoice:action.payload,
                loading:false
            }
        case actions.GET_INVOICE_ERROR:
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

export function invoiceStatus(state = initState_status, action = {}){
    switch (action.type) {
        case actions.GET_INVOICE_STATUS:
            return {
                ...state,
                invoice_status:action.payload
            }
        case actions.GET_INVOICE_ERROR:
            return initState_status
        default:
            return state
    }
}
