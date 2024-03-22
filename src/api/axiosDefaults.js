import axios from "axios";

axios.defaults.baseURL = "https://chatcomdrfapi-09a2723b7b7c.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();