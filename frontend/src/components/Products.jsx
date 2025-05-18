import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/ProductApi";
import Form from "./Form";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const getProductData = async () => {
    const res = await getProducts();
    console.log(res.data);
    setProducts(res.data);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        const UpdatedProducts = products.filter((currProduct) => {
          return currProduct._id !== id;
        });
        setProducts(UpdatedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProduct = (product) => {
    setUpdateData(product);
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <>
      <section className="section-form">
        <Form
          products={products}
          setProducts={setProducts}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      </section>
      <section className="section-products">
        <ul>
          <ol>
            {products.map((product) => {
              const { _id, name, quantity, price } = product;

              return (
                <li key={_id}>
                  <p>Name: {name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: {price}</p>
                  <button onClick={() => handleUpdateProduct(product)}>
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteProduct(_id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ol>
        </ul>
      </section>
    </>
  );
};

export default Products;
