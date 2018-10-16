import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ success: null, dashboard:null, message:null, loading:null })
export function dashReducer(state=initState, action={}){
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
const initEnState =Immutable({
    loading: null,
    success: null,
    engagement: null,
    message: null
}); 
export function engagementReducer(state=initEnState, action={}){
    switch (action.type) {
        case actions.GET_ENGAGEMENT:
            return{
                ...state,
                loading: true,
            }

        case actions.ENGAGEMENT_SUCCESS:
            return{
                ...state,
                loading: false,
                engagement: action.payload,
                success: true,
            }

        case actions.ENGAGEMENT_ERROR:
            return{
                ...state,
                success: false,
                loading: false,
                message: action.payload
            }

        default:
            return state
    }
}