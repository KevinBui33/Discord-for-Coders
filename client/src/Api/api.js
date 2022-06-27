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
  axios
    .post(baseURL + "/login", data)
    .then((res) => {
      console.log(res);
      if (res.data) {
        console.log("got an acesstoken");
        localStorage.setItem("user", JSON.stringify(res.data));
      }

      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUsers = async (data) => {
  return resolve(axios.get(baseURL + "/users", { params: data }));
};
