export default {
    baseapi : "https://www.weddingphotomenu.com/api/contractor",
    wpblogapi: "https://classicphotographers.com/wp-json/wp/v2/posts?categories=494&_embed&"
}
const API_ACTION = {
     KEY : 'key',
     ACTION : 'action',
     KEY_NUM  : 'WERIUE343737KSDFJIRNZNV',
     LOGIN : 'login',
     GET_PENDING_CONTRACT: 'get_contractor_contracts',
     GET_CONTRACT_DETAIL: 'get_contractor_contract_description',
     SET_CONTRACT_STATUS: 'set_contractor_contract_status',
     LOGIN_REGISTER: 'first_login_from_app',
     GET_DASHBOARD: 'get_dashboard_data',
     MARK_NEW_BOOKING_CALL_COMPLETE: 'mark_new_booking_call_complete',
     MARK_PHOTOSHOOT_CALL_COMPLETE: 'mark_photoshoot_call_complete',
     DEVICE_REIGSTER: 'mobile_register',
     GET_ORDER: 'get_orders',
     GET_UNAVAILABLE_DATE: 'get_unavailable_dates',
     ADD_UNAVAILABLE_DATE: 'add_unavailable_date',
     DELETE_UNAVAILABLE_DATE: 'delete_unavailable_date',
     POST_ENGAGEMENT_SCHEDULE: 'POST_ENGAGEMENT_SCHEDULE',
     GET_ENGAGEMENT_SCHEDULE: 'get_engagement_schedule',
     GET_WEDDING_WORKSHEET: 'get_wedding_worksheet',
     GET_ENGAGEMENT_WORKSHEET: 'get_engagement_worksheet',
     REQUEST_PAYMENT: 'REQUEST_PAYMENT',
     USER_TYPE: 'photographer',
     LOGIN_SOURCE: 'ios_mobile',
     PAYMENT : 'get_payment_list',
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