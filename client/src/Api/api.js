import axios from "axios";
import { resolve } from "./resolve";

const baseURL = "http://localhost:5000";

axios.defaults.withCredentials = true;

export const test = async () => {
  return resolve(axios.get(baseURL + "/getuser"));
};

export const createAccount = async (data) => {
  return resolve(axios.post(baseURL + "/register", data));
};

export const loginLocal = async (data) => {
  return resolve(axios.post(baseURL + "/login", data));
};

export const getUsers = async (data) => {
  return resolve(axios.get(baseURL + "/users", { params: data }));
};

export const addFriend = async (data, token) => {
  return resolve(axios.post(baseURL + "/friend", data, { params: { token } }));
};
