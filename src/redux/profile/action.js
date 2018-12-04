const actions = {
  GETTING_PROFILE: "GETTING_PROFILE",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  GET_PROFILE_ERROR:"GET_PROFILE_ERROR",
  getProfile: payload => ({
      type: actions.GETTING_PROFILE,
      payload
  })

}

export default actions