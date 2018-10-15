const actions = {
    GETTING_ORDER: "GETTING_ORDER",
    GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS",
    GET_ERROR:"GET_ERROR",
    GETTING_INVOICE:"GETTING_INVOICE",
    GET_INVOICE_SUCCESS:"GET_INVOICE_SUCCESS",
    GET_INVOICE_ERROR:"GET_INVOICE_ERROR",
    GETTING_INVOICE_STATUS:"GETTING_INVOICE_STATUS",
    GET_INVOICE_STATUS:"GET_INVOICE_STATUS",
    GET_INVOICE_STATUS_ERROR:"GET_INVOICE_STATUS_ERROR",
    GET_ORDERDETAILS:"GET_ORDERDETAILS",
    GET_ORDERDETAILS_SUCCESS:"GET_ORDERDETAILS_SUCCESS",
    GET_ORDERDETAILS_ERROR:"GET_ORDERDETAILS_ERROR",
    getOrder: payload => ({
        type: actions.GETTING_ORDER,
        payload
    }),
    
    getInvoice: payload =>({
        type:actions.GETTING_INVOICE,
        payload
    }),

    getInvoiceStatus:payload=>({
        type:actions.GETTING_INVOICE_STATUS,
        payload
    }),

    getOrderDetails:payload=>({
        type:actions.GET_ORDERDETAILS,
        payload
    })

}
  
  export default actions