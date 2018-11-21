import { API_ACTION } from '../../settings/appconfig';
import SuperFetch from '../superfetch';
class NotificationHelper {
  RegisterDevice = async param => {
      const body = new FormData();
      body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
      body.append(API_ACTION.ACTION, API_ACTION.DEVICE_REIGSTER);
      body.append('json', true);
      body.append('photog_id', param.photog_id);
      body.append('user_type', API_ACTION.USER_TYPE);
      body.append('device_token', param.device_token);
      console.log()
      return await SuperFetch.post("/", body)
          .then((resp)=> resp.json())
          .then(resp=>{
              console.log('register_result~~~~~', resp)
              return this.handleResponse(resp)
          });
  }

  handleResponse = (response) => {
    if (response.success == "true") { 
        return response.data
    }    
    return {
        error: response.message
    }
  }

}
export default new NotificationHelper()