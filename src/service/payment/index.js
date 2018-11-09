import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class PaymentHelper {
    getPaymentHistory = async param => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.PAYMENT);
        body.append('json', true);
        body.append('user_type', API_ACTION.USER_TYPE);
        body.append('photog_id', param.photog_id);
        body.append('cust_id', param.cust_id);
        body.append('pay_for', 'Wedding');
        body.append('odr_id', param.odr_id);
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }
}

export default new PaymentHelper()