// src/api/auth.js
import axios from "axios";

const BASE_URL = "https://eco-full-cn6m.vercel.app/api";

export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData);
};
