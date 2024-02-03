import axios from 'axios';

// const url = "http://localhost:5000/auth";
const url = "https://explore-mern-30ed27839c74.herokuapp.com/auth";

export const authUser = (token) => axios.post(url, token);