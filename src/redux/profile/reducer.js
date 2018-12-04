import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ success: null, profile: null, message:null, loading:null })

export function profileReducer(state = initState, action={}) {
  switch (action.type) {
      case actions.GETTING_PROFILE:
        return {
          ...state,
          success: null,
          loading: true,
          message: null,
          profile: null
        }
      case actions.GET_PROFILE_SUCCESS:
        return {
          ...state,
          success: true,
          profile: action.payload,
          loading: false
        }
      case actions.GET_PROFILE_ERROR: 
        return {
          ...state,
          success: false,
          profile: null,
          message: action.payload,
          loading: false,
        }
      default:
        return state
  }
}