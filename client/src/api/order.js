import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/orders",
});

export const getMyOrders = () => {
  return api.get(`/myorders`);
};
export const getOrders = () => {
  return api.get(`/`);
};
export const CreateOrder = (order) => {
  return api.post(`/`, order);
};
export const getOrder = (id) => {
  return api.get(`/${id}`);
};
export const updateOrderStatus = (id) => {
  return api.get(`/${id}`);
};
