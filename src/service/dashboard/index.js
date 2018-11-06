import { API_ACTION } from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class DashHelper {
  getDashBoard = async userInfo => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_DASHBOARD);
    body.append('json', true);
    body.append('photog_id', userInfo.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);

    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
        console.log('resp====>', resp)
        return resp
      });
  }

  getEngagement = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_ENGAGEMENT_SCHEDULE);
    body.append('json', true);
    body.append('photog_id', param.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('cust_id', param.cust_id)
    body.append('odr_id', param.odr_id)
    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
        console.log('resp====>', resp)
        return resp
      });
  }

  getWeddingWorksheet = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_WEDDING_WORKSHEET);
    body.append('json', true);
    body.append('photog_id', param.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('cust_id', param.cust_id)
    body.append('odr_id', param.odr_id)
    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
        console.log('resp====>', resp)
        return resp
      });
  }

  getEngagementWorksheet = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_ENGAGEMENT_WORKSHEET);
    body.append('json', true);
    body.append('photog_id', param.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('cust_id', param.cust_id)
    body.append('odr_id', param.odr_id)
    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
        console.log('resp====>', resp)
        return resp
      });
  }

  markNewBookingCallComplete = (param, cb) => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.MARK_NEW_BOOKING_CALL_COMPLETE);
    body.append('json', true);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('photog_id', param.photog_id);
    body.append('n_id', param.n_id);
    body.append('cust_id', param.cust_id);
    body.append('odr_id', param.odr_id);
  
    SuperFetch.post("/", body)
      .then((resp) => resp.json())
      .then(resp => {
        console.log("resp",resp);
        cb(resp);
      })

  }

  markPhotoshootCallComplete = (param, cb) => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.MARK_PHOTOSHOOT_CALL_COMPLETE);
    body.append('json', true);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('photog_id', param.photog_id);
    body.append('n_id', param.n_id);
    body.append('cust_id', param.cust_id);
    body.append('odr_id', param.odr_id);
  
    SuperFetch.post("/", body)
      .then((resp) => resp.json())
      .then(resp => {
        console.log("resp",resp);
        cb(resp);
      })
  }

  getOrder = async(param) => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_ORDER);
    body.append('json', true);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('photog_id', param.photog_id);
    body.append('search_term', param.search_term);
    body.append('show_recent', param.show_recent)
    
    return await SuperFetch.post("/", body)
      .then((resp) => resp.json())
      .then(resp => {
        if(resp.success=="true")
          return resp;
        else
          return {error: true, data: resp.message}
      })
  }


}

export default new DashHelper()