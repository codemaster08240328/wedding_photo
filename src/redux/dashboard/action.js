const actions = {
  GET_DASHBOARD: "GET_DASHBOARD",
  GET_DASHBOARD_SUCCESS: "GET_DASHBOARD_SUCCESS",
  GET_DASHBOARD_ERROR: "GET_DASHBOARD_ERROR",
  GET_ENGAGEMENT: 'GET_ENGAGEMENT',
  ENGAGEMENT_SUCCESS: 'ENGAGEMENT_SUCCESS',
  ENGAGEMENT_ERROR: 'ENGAGEMENT_ERROR',
  getDashboard: payload => ({
    type: actions.GET_DASHBOARD,
    payload
  }),
  getEngagementSchedule: payload => ({
    type: actions.GET_ENGAGEMENT,
    payload
  })
}

export default actions