import API from "../settings/appconfig"
const base = (method, path, data) => {
  console.log('data', data)
  return fetch(`${API.baseapi}${path}`, {
    method: method,
    body: data ? data : undefined 
  }).catch(error => ({ error: "Server Error" }))
}

class SuperFetch {
  get = path => {
    return base("get", path)
  }

  post = (path, data) => {
    return base("post", path, data)
  }
  
  put = (path, data) => {
    return base("put", path, data)
  }
  
  delete = (path) =>{
    return base('delete',path)
  }
}

export default new SuperFetch()
