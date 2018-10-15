import {APP_SETTING} from '../../settings/appconfig';
import API from "../../settings/appconfig"
const getContentFromHTML=(html)=>{
    content = html.replace('more','');
    return content;
}



class BlogHelper {
    getBlogList = async payload => {
        if (!payload.amtperpage || !payload.pagenum) {
            return { error: "Please fill in all fields" }
        }

        path = 'per_page=' + payload.amtperpage + "&page=" + payload.pagenum;
        return fetch(API.wpblogapi+path)
                .then((resp)=>resp.json())
                .then(res=>{
                    return this.handleResponse(res)
                })
                .catch(error=>({error:error}))
        
    }

    
    handleResponse = (response) => {
        result = [];
        for (i=0;i<response.length;i++){
            result[i] = {
                image:response[i]._embedded['wp:featuredmedia'][0].source_url,
                short_content:getContentFromHTML(response[i].excerpt.rendered),
                title:response[i].title.rendered,
                custom_link:response[i].custom_link,
                link:response[i].link
            }
        } 
        return result;
    }



    
}

export default new BlogHelper()