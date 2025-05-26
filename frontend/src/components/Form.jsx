import React, { useEffect, useState } from "react";
import { CreateProduct } from "../api/ProductApi";

const Form = ({ products, setProducts, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    updateData &&
      setAddData({
        name: updateData.name || "",
        price: updateData.price || 0,
        quantity: updateData.quantity || 0,
      });
  }, [updateData]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const addProductData = async () => {
    const res = await CreateProduct(addData);
    if (res.status === 200) {
      setProducts([...products, res.data]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addProductData();
    setAddData({
      name: "",
      price: 0,
      quantity: 0,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Product Name"
          autoComplete="off"
          value={addData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="quantity"></label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Add Quantity"
          autoComplete="off"
          value={addData.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="price"></label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Add Price"
          autoComplete="off"
          onChange={handleInputChange}
          value={addData.price}
        />
      </div>
      <button>Add Product</button>
    </form>
  );
};

export default Form;
