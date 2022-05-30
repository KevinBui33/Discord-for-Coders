import axios from "axios";
import { resolve } from "./resolve";

const baseURL = "http://localhost:5000";

export const test = async () => {
  return resolve(axios.get(baseURL));
};

export const createAccount = async (data) => {
  return resolve(axios.post(baseURL + "/register", data));
};
