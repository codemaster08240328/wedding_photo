import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ loginsuccess: null, user:null, message:null, loading:null })
const initState1 = Immutable({success:null,message:null})
export function authReducer(state = initState, action={}) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loginsuccess:true,
                user:action.payload,
                loading:false
            }
        case actions.LOGIN_ERROR:
            return {
                ...state,
                loginsuccess:false,
                message:action.payload,
                loading:false,
            }
        case actions.FORGOT_PASS_RESULT:
            return{
                ...state,
                message:action.payload
            }
        case actions.LOGOUT:
            return initState
        default:
            return state
    }
}
export function changePwdReducer(state=initState1, action={}){
    switch(action.type){
        case actions.CHANGE_PASS_SUCCESS:
            return {
                ...state,
                success:'true',
                message:action.payload
            }
        case actions.CHANGE_PASS_ERROR:
            return {
                ...state,
                success:'false',
                message:action.payload
            }
        default:
            return state;
    }
}
