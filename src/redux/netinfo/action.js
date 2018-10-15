const actions = {
    NETWORK_STATUS:"NETWORK_STATUS",
    netinfo: payload => ({
      type: actions.NETWORK_STATUS,
      payload
    }),
}
  
export default actions