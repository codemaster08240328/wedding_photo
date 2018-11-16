class NotificationHelper {
  RegisterDevice = async userInfo => {
      const body = new FormData();
      // body.append(API_ACTION.KEY, API_ACTION.KEY_NUM);
      // body.append(API_ACTION.ACTION, API_ACTION.ORDER);
      // body.append('json', true);
      // body.append('cust_id', userInfo.cust_id);
  
      // return await SuperFetch.post("/", body)
      //     .then((resp)=> resp.json())
      //     .then(resp=>{
      //         return this.handleResponse(resp)
      //     });
  }
}
export default new NotificationHelper()