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

    
}

export default new ProfileHelper()