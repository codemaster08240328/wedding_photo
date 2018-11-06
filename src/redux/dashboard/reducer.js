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
    engagement: {},
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
                engagement: action.payload.data,
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

const initWeState = Immutable({
    loading: null,
    success: null,
    wedding_worksheet: {},
    message: null
})

export function weddingWorksheetReducer(state=initWeState, action={}){
    switch (action.type) {
        case actions.GET_WEDDING_WORKSHEET:
            return{
                ...state,
                loading: true,
            }

        case actions.WEDDING_WORKSHEET_SUCCESS:
            return{
                ...state,
                loading: false,
                wedding_worksheet: action.payload.data,
                success: true,
            }

        case actions.WEDDING_WORKSHEET_ERROR:
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

const initEnWoState = Immutable({
    loading: null,
    success: null,
    engagement_worksheet: {},
    message: null
})

export function engagementWorksheetReducer(state=initEnWoState, action={}){
    switch (action.type) {
        case actions.GET_ENGAGEMENT_WORKSHEET:
            return{
                ...state,
                loading: true,
            }

        case actions.ENGAGEMENT_WORKSHEET_SUCCESS:
            return{
                ...state,
                loading: false,
                engagement_worksheet: action.payload.data,
                success: true,
            }

        case actions.ENGAGEMENT_WORKSHEET_ERROR:
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

const initOrderState = Immutable({
    loading: null,
    success: null,
    order: [],
    message: null
})

export function orderReducer(state=initOrderState, action={}){
    switch (action.type) {
        case actions.GET_ORDER:
            return{
                ...state,
                loading: true,
            }

        case actions.ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                order: action.payload.data,
                success: true,
            }

        case actions.ORDER_FAIL:
            return{
                ...state,
                success: false,
                loading: false,
                order: {},
                message: payload
            }

        default:
            return state
    }
}

const initUnavailableState = Immutable({
    loading: null,
    success: null,
    unavailable_date: [],
    message: null
})

export function unavailableDateReducer(state=initUnavailableState, action={}){
    switch (action.type) {
        case actions.GET_UNAVAILABLE_DATE:
            return{
                ...state,
                loading: true,
            }

        case actions.UNAVAILABLE_DATE_GET_SUCCESS:
            return{
                ...state,
                loading: false,
                unavailable_date: action.payload.data,
                success: true,
            }

        case actions.UNAVAILABLE_DATE_GET_FALSE:
            return{
                ...state,
                success: false,
                loading: false,
                unavailable_date: [],
                message: payload
            }

        default:
            return state
    }
}