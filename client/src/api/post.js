import axios from 'axios';

// const url = "http://localhost:5000";
const url = "https://explore-mern-30ed27839c74.herokuapp.com/";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  }

  return req;
});

export const fetchPost = (page) => API.get(`posts?page=${page}`);
export const searchPost = (searchQuery) => API.get(`posts/search?search=${searchQuery.search || null}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const addComment = (id, comment) => API.patch(`posts/${id}/addComment`, comment);
export const likePost = (id, post) => API.patch(`posts/${id}/like`, post);
export const updatePost = (id, post) => API.patch(`posts/${id}`, post);
export const deletePost = (id) => API.delete(`posts/${id}`);