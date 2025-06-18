import axios from "axios";

const api = axios.create({
  baseURL: "https://server-production-28d3.up.railway.app/api/categories",
});

export const getCategories = (id) => {
  return api.get(`/`);
};
