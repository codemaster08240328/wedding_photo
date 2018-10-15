const actions = {
    GETTING_WPWORKSHEET: "GETTING_WPWORKSHEET",
    GET_WPWORKSHEET_SUCCESS: "GET_WPWORKSHEET_SUCCESS",
    GET_WPWORKSHEET_ERROR:"GET_WPWORKSHEET_ERROR",
    GETTING_WVWORKSHEET:"GETTING_WVWORKSHEET",
    GET_WVWORKSHEET_SUCCESS:"GET_WVWORKSHEET_SUCCESS",
    GET_WVWORKSHEET_ERROR:"GET_WVWORKSHEET_ERROR",
    GETTING_EPWORKSHEET:"GETTING_EPWORKSHEET",
    GET_EPWORKSHEET_SUCCESS:"GET_EPWORKSHEET_SUCCESS",
    GET_EPWORKSHEET_ERROR:"GET_EPWORKSHEET_ERROR",
    getWpWorksheet: payload => ({
        type: actions.GETTING_WPWORKSHEET,
        payload
    }),
    
    getEpWorksheet: payload =>({
        type:actions.GETTING_EPWORKSHEET,
        payload
    }),

    getWvWorksheet:payload=>({
        type:actions.GETTING_WVWORKSHEET,
        payload
    })
}
  
export default actions