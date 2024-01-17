import axios from "axios";

const url = "http://localhost:5000/user";

export const createUser = (newUser) => axios.post(`${url}/signUp`, newUser);
export const signIn = (data) => axios.post(`${url}/signIn`, data);