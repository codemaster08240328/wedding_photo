import pay from "../../pages/order/pay";

const actions = {
  GET_DASHBOARD: "GET_DASHBOARD",
  GET_DASHBOARD_SUCCESS: "GET_DASHBOARD_SUCCESS",
  GET_DASHBOARD_ERROR: "GET_DASHBOARD_ERROR",
  GET_ENGAGEMENT: 'GET_ENGAGEMENT',
  ENGAGEMENT_SUCCESS: 'ENGAGEMENT_SUCCESS',
  ENGAGEMENT_ERROR: 'ENGAGEMENT_ERROR',
  GET_WEDDING_WORKSHEET: 'GET_WEDDING_WORKSHEET',
  WEDDING_WORKSHEET_SUCCESS: 'WEDDING_WORKSHEET_SUCCESS',
  WEDDING_WORKSHEET_ERROR: 'WEDDING_WORKSHEET_ERROR',
  getDashboard: payload => ({
    type: actions.GET_DASHBOARD,
    payload
  }),
  getEngagementSchedule: payload => ({
    type: actions.GET_ENGAGEMENT,
    payload
  }),
  getWeddingWorksheet: payload => ({
    type: actions.GET_WEDDING_WORKSHEET,
    payload
  })
}

export default actions