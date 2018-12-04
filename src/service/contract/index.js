import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class ContractHelper {
  getPendingContract = async userInfo => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_PENDING_CONTRACT);
    body.append('json', true);
    body.append('photog_id', userInfo.photog_id);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('contract_status', userInfo.contract_status);
    body.append('limit', 20)

    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
          console.log(resp)
          return this.handleResponse(resp)
      });
  }
  getSignedContract = async userInfo => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.GET_PENDING_CONTRACT);
    body.append('json', true);
    body.append('photog_id', userInfo.email);
    body.append('user_type', API_ACTION.USER_TYPE)

    return await SuperFetch.post("/", body)
      .then((resp)=> resp.json())
      .then(resp=>{
          console.log(resp)
          return this.handleResponse(resp,userInfo.pass)
      });
  }
  getContractDetail = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM)
    body.append(API_ACTION.ACTION, API_ACTION.GET_CONTRACT_DETAIL)
    body.append('html', true)
    body.append('photog_id', param.photog_id)
    body.append('user_type', API_ACTION.USER_TYPE)
    body.append('contract_id', param.contract_id)

    return await SuperFetch.post("/", body)
      .then((resp)=> resp.text())
  }
  // fixing....
  setContractStatus = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM)
    body.append(API_ACTION.ACTION, API_ACTION.SET_CONTRACT_STATUS)
    body.append('html', true)
    body.append('photog_id', param.photog_id)
    body.append('user_type', API_ACTION.USER_TYPE)
    body.append('contract_status', param.contract_status)
    body.append('contract_id', param.contract_id)
    body.append('odr_id', param.odr_id)
    body.append('cust_id', param.cust_id)
    body.append('decline_code', param.decline_code)
    body.append('decline_reason_detail', param.decline_reason_detail)
    body.append('photog_ip', param.photog_ip)

    return await SuperFetch.post("/", body)
      .then((resp)=> resp.text())
  }

  handleResponse = (response) => {
    if (response.success=="true") { 
      return response.data
    }

    return {
      error: response.message
    }
  }
}

export default new ContractHelper()