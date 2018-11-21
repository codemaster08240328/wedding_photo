import {API_ACTION} from '../../settings/appconfig';
import SuperFetch from '../superfetch';
import { AsyncStorage } from 'react-native';

class AuthHelper {
    authorize = async userInfo => {
        if (!userInfo.email || !userInfo.pass) {
            return { error: "Please fill in all fields" }
        }
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.LOGIN);
        body.append('json', true);
        body.append('photog_login', userInfo.email);
        body.append('photog_pass', userInfo.pass);
        body.append('user_type', API_ACTION.USER_TYPE)
        body.append('login_source', API_ACTION.LOGIN_SOURCE)
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                return this.handleResponse(resp,userInfo.pass)
            });
    }

    forgotPassword = async email_address=>{
        if(!email_address){
            return {
                error : "Please fill in the email field"
            }
        }
        const body = new FormData()
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.FORGOT_PWD)
        body.append('json', true);
        body.append('cust_email', email_address);

        return await SuperFetch.post("/", body)
            .then((resp)=>resp.json())
            .then(resp=>{
                return resp.success
            })
    }

    changePassword = async payload=>{
        if(payload.new_password!=payload.confirm_new_password){
            return {
                error : "New passwords don't match."
            }
        }
        const body = new FormData()
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.CHANGE_PASSWORD)
        body.append('json', true);
        body.append('cust_id', payload.cust_id);
        body.append('old_password', payload.old_password);
        body.append('new_password', payload.new_password);
        body.append('confirm_new_password', payload.confirm_new_password);


        return await SuperFetch.post("/", body)
            .then((resp)=>resp.json())
            .then(resp=>{
                if(resp.success=='true'){
                    return resp.message;
                }else{
                    return {error:resp.message}
                }
            })
    }

    handleResponse = (response,pass) => {
        if (response.success=="true") { 
            this.setStorage(response, pass);
            return response
        }
    
        return {
            error: response.message
        }
    }
    setStorage = async(result, pass)=>{
        console.log("storage,=======>",result);
        await AsyncStorage.setItem('email', result.photog_email)
        await AsyncStorage.setItem('pass',pass)
        await AsyncStorage.setItem('photog_id',result.photog_id)
    }
    loginRegister = async payload => {
        const body = new FormData();
        body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
        body.append(API_ACTION.ACTION, API_ACTION.LOGIN_REGISTER);
        body.append('json', true);
        body.append('photog_id', payload.photog_id);
        body.append('user_type', API_ACTION.USER_TYPE)
    
        return await SuperFetch.post("/", body)
            .then((resp)=> resp.json())
            .then(resp=>{
                console.log(resp)
                return this.handleResponse(resp,userInfo.pass)
            });
    }

    
}

export default new AuthHelper()