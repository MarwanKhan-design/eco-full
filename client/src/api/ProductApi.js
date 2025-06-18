import axios from "axios";

const api = axios.create({
  baseURL: "https://server-production-28d3.up.railway.app/api/products",
});

export const getProducts = () => {
  return api.get("/");
};
export const getProduct = (id) => {
  return api.get(`/${id}`);
};
export const getProductsByCategory = (id) => {
  return api.get(`/category/${id}`);
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
