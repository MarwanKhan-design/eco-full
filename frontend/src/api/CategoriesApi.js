import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/categories",
});

export const getCategories = (id) => {
  return api.get(`/`);
};
