import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/products",
});

export const getProducts = () => {
  return api.get("/");
};

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");
  return api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const CreateProduct = (product) => {
  const token = localStorage.getItem("token");
  return api.post(`/`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateProduct = (product, id) => {
  const token = localStorage.getItem("token");
  return api.put(`/${id}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
