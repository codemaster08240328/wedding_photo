import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';
import pay from '../../pages/order/pay';

class ProposalHelper {
    getProposalList = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.PROPOSAL);
        body.append('json', true);
        body.append('cust_id', payload);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }

    getProposalOrderDetail = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.REVIEW);
        body.append('json', true);
        body.append('prop_id', payload.prop_id);
        body.append('odr_id', payload.odr_id);
        body.append('apply_coupon', payload.apply_coupon);    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }

    getProposalStatus = async payload => {
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
    changeProposalRequest = async payload =>{
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.PROPOSAL_CHANGE_REQUEST);
        body.append('json', true);
        body.append('cust_id', payload.cust_id);
        body.append('prop_id', payload.prop_id);
        body.append('note_desc', payload.note_desc);
        return await SuperFetch.post("/", body)
            .then((resp)=>resp.json())
            .then(resp=>{
                if(resp.success=="true"){
                    console.log("resp",resp);
                    return {
                        success:resp.message
                    }
                }
                return{
                    error:resp.message
                }
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

export default new ProposalHelper()