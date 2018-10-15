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


}

export default new DashHelper()