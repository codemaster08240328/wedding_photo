import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class ProfileHelper {
  getProfile = async payload => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_PROFILE);
    body.append('json', true);
    body.append('photog_id', payload.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE)
    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
          return resp
      });
  }

  setProfile = async payload => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.SET_PROFILE);
    body.append('json', true);
    body.append('photog_id', payload.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('photog_fname', payload.photog_fname);
    body.append('photog_lname', payload.photog_lname);
    body.append('photog_email', payload.photog_email);
    body.append('photog_phone', payload.photog_phone);
    body.append('photog_block_sun', payload.photog_block_sun);
    body.append('photog_block_mon', payload.photog_block_mon);
    body.append('photog_block_tue', payload.photog_block_tue);
    body.append('photog_block_wed', payload.photog_block_wed);
    body.append('photog_block_thu', payload.photog_block_thu);
    body.append('photog_block_fri', payload.photog_block_fri);
    body.append('photog_block_sat', payload.photog_block_sat);
    body.append('is_second_shooter', payload.is_second_shooter);
    body.append('photog_distance_value', payload.photog_distance_value);
    if(!!payload.photog_pass) 
      body.append('photog_pass', payload.photog_pass);
    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then((res)=>{return res})
  }

    
}

export default new ProfileHelper()