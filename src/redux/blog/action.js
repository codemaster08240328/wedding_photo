const actions = {
    GET_BLOG_LIST:"GET_BLOG_LIST",
    BLOG_LIST_SUCCESS:"BLOG_LSIT_SUCCESS",
    BLOG_LIST_ERROR:"BLOG_LIST_ERROR",
    getBlogList: payload => ({
      type: actions.GET_BLOG_LIST,
      payload
    }),
    
  }
  
  export default actions