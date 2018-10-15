import actions from "./action"
import Immutable from 'seamless-immutable';

const initState = Immutable({ netinfo: true})

export function netInfo(state = initState, action={}) {
    switch (action.type) {
        case actions.NETWORK_STATUS:
            return {
                ...state,
                netinfo:action.payload
            }
        default:
            return state
    }
}
