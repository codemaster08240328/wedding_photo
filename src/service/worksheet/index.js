import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';

class WorksheetHelper {
    getWpworksheet = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.GETWEDDINGPHOTOGRPHY);
        body.append('json', true);
        body.append('cust_id', payload);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }

    getEpworksheet = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.GETENGAGEMENTPHOTOGRPHY);
        body.append('json', true);
        body.append('cust_id', payload);
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp)
            });
    }

    getWvworksheet = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.GETWEDDINGVIDEOGRAPHY);
        body.append('json', true);
        body.append('cust_id', payload);
    
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
    generateWeddingPhotographyWorksheet = async (data, cb) => {
        data.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        data.append(API_ACTION.ACTION, API_ACTION.GENERATEWEDDINGPHOTOGRAPHYWORKSHEET);
        data.append('json', true);  
        console.log("data",data);
        return await SuperFetch.post("/", data)
            .then((resp)=> resp.json())
            .then(resp=>{
                if(resp.success == 'true'){
                    cb(resp)
                }
            });
    }

    generateEngagementPhotographyWorksheet = async (data, cb) => {
        data.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        data.append(API_ACTION.ACTION, API_ACTION.GENERATEENGAGEMENTPHOTOGRAPHYWORKSHEET);
        data.append('json', true);  
        return await SuperFetch.post("/", data)
            .then((resp)=> resp.json())
            .then(resp=>{
                if(resp.success == 'true'){
                    cb(resp)
                }
            });
    }

    generateWeddingVideographyWorksheet = async (data, cb) => {
        data.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        data.append(API_ACTION.ACTION, API_ACTION.GENERATEWEDDINGVIDEOGRAPHYWORKSHEET);
        data.append('json', true);  
        return await SuperFetch.post("/", data)
            .then((resp)=> resp.json())
            .then(resp=>{
                if(resp.success == 'true'){
                    cb(resp)
                }
            });
    }


}

export default new WorksheetHelper()