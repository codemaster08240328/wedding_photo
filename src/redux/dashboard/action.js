const actions = {
  GET_DASHBOARD: "GET_DASHBOARD",
  GET_DASHBOARD_SUCCESS: "GET_DASHBOARD_SUCCESS",
  GET_DASHBOARD_ERROR: "GET_DASHBOARD_ERROR",
  getDashboard: payload => ({
    type: actions.GET_DASHBOARD,
    payload
  }),
}

export default actions