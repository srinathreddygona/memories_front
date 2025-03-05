import * as api from '../api';
import { FETCH_ALL,DELETE,CREATE,UPDATE,FETCH_USER_POSTS, FETCH_BY_SEARCH ,START_LOADING,END_LOADING,FETCH_POST,COMMENT} from '../constants/actiontypes';

//Action Creators

export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
      console.log(error);
    }
  };
export const getPosts=(page)=> async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const {data}=await api.fetchPosts(page);
         console.log(data);
    const action={type:FETCH_ALL,payload:data}
    dispatch( action) ;
    dispatch({type:END_LOADING});
        
    } catch (error) {
        console.log(error.message);
    }
};
export const getUserPosts = (id, page) => async (dispatch) => {
    try {
        console.log(`📡 Fetching User Posts - User: ${id}, Page: ${page}`);
        const { data } = await api.fetchUserPosts(id, page);

        console.log("✅ API Response:", data);

        dispatch({
            type: "FETCH_USER_POSTS",
            payload: {
                data: data.data, 
                currentPage: data.currentPage,
                numberOfPages: data.numberOfPages,
            },
        });
    } catch (error) {
        console.error("❌ Error fetching user posts:", error);
    }
};


export const getPostsBySearch=(searchQuery)=>async (dispatch) => {
    try {
        dispatch({type:START_LOADING});

        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        const action={type:FETCH_BY_SEARCH,payload:data}

        dispatch( action) ;
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost=(post,history)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});

        const {data}=await api.createPost(post);
        history.push(`/posts/${data._id}`);

        dispatch({type:CREATE,payload:data});
    } catch (error) {
        console.log(error);
    }

}
export const updatePost=(id,post)=>async(dispatch)=>{
    try {
        const {data}=await api.updatePost(id,post);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost=(id)=> async(dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error);
    }
}
export const likePost =(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}
export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };