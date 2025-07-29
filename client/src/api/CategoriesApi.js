import axios from "axios";

const api = axios.create({
  baseURL: "https://eco-full-cn6m.vercel.app/api/categories",
});

export const getCategories = (id) => {
  return api.get(`/`);
};
