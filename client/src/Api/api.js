import axios from "axios";

const baseURL = "http://localhost:5000";

const fetch = async (method, url, data) => {
  const newURL = baseURL + url;

  return axios({ method, url: newURL, data })
    .then((res) => res)
    .catch((err) => console.error(err));
};

const get = async (url, data) => {
  return fetch("get", url, data);
};

export const test = () => {
  return get("", {});
};
