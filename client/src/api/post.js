import axios from 'axios';

const url = "http://localhost:5000/posts";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
  }

  return req;
});

export const fetchPost = () => API.get(url);
export const createPost = (newPost) => API.post(url, newPost);
export const likePost = (id, post) => API.patch(`${url}/${id}/like`, post);
export const updatePost = (id, post) => API.patch(`${url}/${id}`, post);
export const deletePost = (id) => API.delete(`${url}/${id}`);