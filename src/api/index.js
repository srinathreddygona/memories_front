
import axios from 'axios';

const API = axios.create({ baseURL:  'https://memories-back-postit.onrender.com' });
// const url='https://memories-back-postit.onrender.com';


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => 
 {
  let query = `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags || ""}`;

  if (searchQuery.userId) {
    query += `&userId=${searchQuery.userId}`;
  }

  return API.get(query);
 }

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchUserPosts = (id, page) => API.get(`/posts/user/${id}?page=${page}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);