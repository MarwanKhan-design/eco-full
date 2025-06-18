import axios from "axios";

const api = axios.create({
  baseURL: "https://server-production-28d3.up.railway.app/api/orders",
});

export const getMyOrders = () => {
  return api.get(`/myorders`);
};
export const getOrders = () => {
  const token = localStorage.getItem("token");
  return api.get(`/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createOrder = (order) => {
  const token = localStorage.getItem("token");

  return api.post(`/`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOrder = (id) => {
  const token = localStorage.getItem("token");
  return api.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateOrderStatus = (id) => {
  return api.get(`/${id}`);
};
