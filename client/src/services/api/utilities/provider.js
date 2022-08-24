import axios from "axios";
import { handleError, handleResponse } from "./response";

const BASEURL = "http://localhost:5000";

/**
 *
 * @param {string} resource
 * @returns
 */
const getAll = (resource) => {
  return axios
    .get(`${BASEURL}/${resource}`)
    .then(handleResponse)
    .catch(handleError);
};

/**
 *
 * @param {string} resource
 * @param {string} id
 * @returns
 */
const getSingle = (resource, id) => {
  return axios
    .get(`${BASEURL}/${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);
};

/**
 *
 * @param {string} resource
 * @param {object} data
 * @returns
 */
const post = (resource, data) => {
  return axios
    .post(`${BASEURL}/${resource}`, data)
    .then(handleResponse)
    .catch(handleError);
};

/**
 *
 * @param {string} resource
 * @param {object} data
 * @returns
 */
const put = (resource, data) => {
  return axios
    .put(`${BASEURL}/${resource}`, data)
    .then(handleResponse)
    .catch(handleError);
};

/**
 *
 * @param {string} resource
 * @param {string} id
 * @returns
 */
const remove = (resource, id) => {
  return axios
    .delete(`${BASEURL}/${resource}`, id)
    .then(handleResponse)
    .catch(handleError);
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  remove,
};
