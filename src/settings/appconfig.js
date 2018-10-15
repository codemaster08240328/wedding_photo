export default {
    baseapi : "https://www.weddingphotomenu.com/api/contractor",
    wpblogapi: "https://classicphotographers.com/wp-json/wp/v2/posts?categories=494&_embed&"
}
const API_ACTION = {
     KEY : 'key',
     ACTION : 'action',
     KEY_NUM  : 'WERIUE343737KSDFJIRNZNV',
     LOGIN : 'login',
     GET_DASHBOARD: 'get_dashboard_data',
     MARK_NEW_BOOKING_CALL_COMPLETE: 'MARK_NEW_BOOKING_CALL_COMPLETE',
     MARK_PHOTOSHOOT_CALL_COMPLETE: 'MARK_PHOTOSHOOT_CALL_COMPLETE',
     POST_ENGAGEMENT_SCHEDULE: 'POST_ENGAGEMENT_SCHEDULE',
     GET_ENGAGEMENT_SCHEDULE: 'GET_ENGAGEMENT_SCHEDULE',
     GET_WEDDING_WORKSHEET: 'GET_WEDDING_WORKSHEET',
     GET_ENGAGEMENT_WORKSHEET: 'GET_ENGAGEMENT_WORKSHEET',
     REQUEST_PAYMENT: 'REQUEST_PAYMENT',
     USER_TYPE: 'photographer',
     LOGIN_SOURCE: 'ios_mobile',
     ORDER : 'getCustomerOrders',
     ORDER_DETAILS:'getOrderDetailsById',
     PROPOSAL : 'getCustomerProposals',
     INVOICE : 'getOderInvoices',
     REVIEW : 'getProposalOrderDetails',
     INVOICE_STATUS : 'getInvoiceDetailsById',
     FORGOT_PWD: "forgotPassword",
     CHANGE_PASSWORD: "changePassword",
     PROPOSAL_CHANGE_REQUEST:"proposalRequestChange",
     GETWEDDINGPHOTOGRPHY:'getWeddingPhotographyWorksheet',
     GETWEDDINGVIDEOGRAPHY : "getWeddingVideographyWorksheet",
     GETENGAGEMENTPHOTOGRPHY:'getEngagementPhotographyWorksheet',
     GENERATEWEDDINGPHOTOGRAPHYWORKSHEET : "generateWeddingPhotographyWorksheet",
     GENERATEWEDDINGVIDEOGRAPHYWORKSHEET : "generateWeddingVideographyWorksheet",
     GENERATEENGAGEMENTPHOTOGRAPHYWORKSHEET : "generateEngagementPhotographyWorksheet"
}
const APP_SETTING = {
    blogAmtPerPage:10
}

export {
    API_ACTION, APP_SETTING
}