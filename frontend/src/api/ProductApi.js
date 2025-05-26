import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/products",
});

export const getProducts = () => {
  return api.get("/");
};

export const deleteProduct = (id) => {
  return api.delete(`/${id}`);
};

export const CreateProduct = (product) => {
  return api.post(`/`, product);
};

export const UpdateProduct = (product, id) => {
  return api.put(`/${id}`, product);
};
