import axios from "axios";
import { getCookie } from "./setCookie";
export const baseURL = "https://apiv2.iot.inflection.org.in";

export const siteBaseURL = "http://localhost:3000";

let apiClient = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

const setAuthHeader = (tokenName) => {
  apiClient = axios.create({
    baseURL,
    withCredentials: false,
    timeout: 30000,
    headers: {
      authorization: `Bearer ${getCookie(tokenName)}`,
      Accept: "application/json",
    },
  });
};

// ------------------ User -----------------------

const login = (payload) => {
  return apiClient.post("/users/login", payload);
};
const getTankCardDetails = (payload) => {
  return apiClient.get("/devices/my", payload);
};
const getTankDetails = (id, payload) => {
  return apiClient.post(`/devices/tank/cmd/${id}`, payload);
};

const renewAccessToken = () => {
  return apiClient.get("/users/renew_token");
};

export default {
  login,
  setAuthHeader,
  getTankCardDetails,
  getTankDetails,
  renewAccessToken,
};
