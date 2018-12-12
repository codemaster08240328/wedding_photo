const actions = {
  WEDDING_PAYMENT_REQUEST: "WEDDING_PAYMENT_REQUEST",
  WEDDING_PAYMENT_REQUEST_SUCCESS: "WEDDING_PAYMENT_REQUEST_SUCCESS",
  WEDDING_PAYMENT_REQUEST_ERROR: "WEDDING_PAYMENT_REQUEST_ERROR",
  IF_SECOND_SHOOTER: 'IF_SECOND_SHOOTER',
  SECOND_SHOOTER_DETAIL: 'SECOND_SHOOTER_DETAIL',
  REQUEST_WEDDING_PAY: 'REQUEST_WEDDING_PAY',
  REQUEST_WEDDING_PAY_SUCCESS: 'REQUEST_WEDDING_PAY_SUCCESS',
  REQUEST_WEDDING_PAY_ERROR: 'REQUEST_WEDDING_PAY_ERROR',
  
  requestWeddingPayment: payload => ({
    type: actions.WEDDING_PAYMENT_REQUEST,
    payload
  }),
  ifSecondShooter:  payload => ({
    type: actions.IF_SECOND_SHOOTER,
    payload
  }),
  secondShooterDetail: payload => ({
    type: actions.SECOND_SHOOTER_DETAIL,
    payload
  }),
  requestWeddingPay: payload => ({
    type: actions.REQUEST_WEDDING_PAY,
    payload
  })
}

export default actions