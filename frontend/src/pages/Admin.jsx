import React, { useState } from "react";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import AdminProductList from "../components/AdminProductList";
import { deleteProduct } from "../api/ProductApi";

export default function AdminProductPage({ products, setProducts }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleUpdate = (id) => {
    setProducts(
      products.map((product) =>
        product._id === id ? { ...product, ...editData } : product
      )
    );
    setEditId(null);
  };

  return (
    <>
      <AdminProductList
        products={products}
        editId={editId}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
}
