// src/api/auth.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData);
};
