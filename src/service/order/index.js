import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class OrderHelper {
    getOrderList = async userInfo => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.ORDER);
        body.append('json', true);
        body.append('cust_id', userInfo.cust_id);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }

    getInvoiceList = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.INVOICE);
        body.append('json', true);
        body.append('odr_id', payload.order_id);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }
    getOrderDetails = async payload =>{
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.ORDER_DETAILS);
        body.append('json', true);
        body.append('odr_id', payload.odr_id);
        return await SuperFetch.post("/", body)
            .then((resp)=>resp.json())
            .then(res =>{
                return this.handleResponse(res)
            })
    }
    getInvoiceStatus = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.INVOICE_STATUS);
        body.append('json', true);
        body.append('inv_id', payload);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
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

export default new OrderHelper()