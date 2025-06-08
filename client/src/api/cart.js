import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/cart",
});

export const getCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  return api.get(`/${user.id}`);
};
export const postProductToCart = (productId, quantity) => {
  const user = localStorage.getItem("user");
  const parseData = JSON.parse(user);
  console.log("user", user.name, parseData.name);
  return api.post(`/`, { productId, quantity, userId: parseData.id });
};
