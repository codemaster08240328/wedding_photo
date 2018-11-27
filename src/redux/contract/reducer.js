import actions from "./action"
import Immutable from 'seamless-immutable';
const initState = Immutable({
                    loading: null,
                    success: null,
                    contract: [],
                    message: null
                  })
export function contractReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.GET_PENDING_CONTRACT:
            return {
                ...state,
                success: null,
                contract: [],
                loading: true,
                message: null
            }
        case actions.GET_PENDING_CONTRACT_SUCCESS: 
            return {
                ...state,
                success: true,
                contract: action.payload,
                loading: false,
            }
        case actions.GET_PENDING_CONTRACT_ERROR:
            return{
                ...state,
                success: false,
                message: action.payload,
                loading: false
            }
        default:
            return state
    }
}