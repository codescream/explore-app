import axios from 'axios';

const url = "http://localhost:5000/auth";

export const authUser = (token) => axios.post(url, token);