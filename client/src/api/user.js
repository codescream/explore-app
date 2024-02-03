import axios from "axios";

// const url = "http://localhost:5000/user";
const url = "https://explore-mern-30ed27839c74.herokuapp.com/user";

export const createUser = (newUser) => axios.post(`${url}/signUp`, newUser);
export const signIn = (data) => axios.post(`${url}/signIn`, data);