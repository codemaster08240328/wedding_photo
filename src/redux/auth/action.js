const actions = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGOUT: "LOGOUT",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",
    GET_USER:'GET_USER',
    FORGOT_PASS: "FORGOT_PASSWORD",
    FORGOT_PASS_RESULT:"FORGOT_PASSWORD_RESULT",
    SET_PASS_SUCCESS:'SET_PASS_SUCCESS',
    SET_PASS_ERROR:'SET_PASS_ERROR',
    SET_USER:'SET_USER',
    CHANGE_PASS:'CHANGE_PASS',
    CHANGE_PASS_SUCCESS:'CHANGE_PASS_SUCCESS',
    CHANGE_PASS_ERROR:'CHANGE_PASS_ERROR',
    login: payload => ({
      type: actions.LOGIN_REQUEST,
      payload
    }),
    logout: () => ({
      type: actions.LOGOUT
    }),
    forgotPass: payload => ({
      type: actions.FORGOT_PASS,
      payload,
    }),
    changePassword:payload=>({
      type:actions.CHANGE_PASS,
      payload
    })
  }
  
  export default actions