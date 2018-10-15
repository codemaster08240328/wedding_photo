import { store } from "./store"
import actions from "./auth/actions"

const { checkAuthorization } = actions

export default () =>
  new Promise(() => {
    store.dispatch(checkAuthorization())
})