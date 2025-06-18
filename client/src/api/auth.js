// src/api/auth.js
import axios from "axios";

const BASE_URL = "https://server-production-28d3.up.railway.app/api";

export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData);
};
