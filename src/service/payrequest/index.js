import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class PayRequestHelper {
  requestWeddingPayment = async param => {
      const body = new FormData();
      body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
      body.append(API_ACTION.ACTION, API_ACTION.GET_HOURS_AS_PER_CONTRACT);
      body.append('json', true);
      body.append('user_type', API_ACTION.USER_TYPE);
      body.append('photog_id', param.photog_id);
      body.append('cust_id', param.cust_id ? param.cust_id : '' );
      body.append('pay_for', param.pay_for);
      body.append('odr_id', param.odr_id ? param.odr_id : '');
      return await SuperFetch.post("/", body)
          .then((resp)=> resp.json())
          .then(resp=>{
              return this.handleResponse(resp)
          });
  }

  requestWeddingPay = async param => {
    const body = new FormData();
    body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
    body.append(API_ACTION.ACTION, API_ACTION.REQUEST_WEDDING_PAYMENT);
    body.append('json', true);
    body.append('user_type', API_ACTION.USER_TYPE);
    body.append('photog_id', param.photog_id);
    body.append('cust_id', param.cust_id ? param.cust_id : '' );
    body.append('pay_for', param.pay_for);
    body.append('if_second_shooter', param.if_second_shooter ? param.if_second_shooter : '');
    body.append('second_shooter_name', param.second_shooter_name ? param.second_shooter_name : '');
    body.append('second_shooter_email', param.second_shooter_email ? param.second_shooter_email : '');
    body.append('second_shooter_paid_by', param.second_shooter_paid_by ? param.second_shooter_paid_by : '');
    body.append('second_shooter_pay_rate', param.second_shooter_pay_rate ? param.second_shooter_pay_rate : '');
    body.append('hours_as_per_contract', param.hours_as_per_contract ? param.hours_as_per_contract : '');
    body.append('additional_hours', param.additional_hours ? param.additional_hours : '');
    body.append('travel_fees', param.travel_fees ? param.travel_fees : '');
    body.append('first_shooter_images', param.first_shooter_images ? param.first_shooter_images : '');
    body.append('second_shooter_images', param.second_shooter_images ? param.second_shooter_images : '');
    body.append('total_images', param.total_images ? param.total_images : '');
    body.append('second_shooter_images_uploaded', param.second_shooter_images_uploaded ? param.second_shooter_images_uploaded : '');
    body.append('odr_id', param.odr_id ? param.odr_id : '');

    return await SuperFetch.post("/", body)
        .then((resp)=> resp.json())
        .then(resp=>{
            console.log("resp~~~~~~~`", resp)
            return this.handleResponse_(resp)
        });
  }

  handleResponse_ = response => {
    if(response.success == 'true'){
      return response.data[0]
    }
  }

  handleResponse = response => {
    if(response.success == 'true'){
      return {
        hours_as_per_contract: response.hours_as_per_contract,
        travel_fees: response.travel_fees
      }
    }else if(response.hours_as_per_contract == 'null'){
      return {
        error: " Please contact customer support to submit payment for this event. Hours per contract not found."
      }
    }else if(!!response.message){
      return {
        error: "Please upload files for this event before submitting payment request."
      }
    }
  }

}

export default new PayRequestHelper()
