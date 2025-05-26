import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/ProductApi";
import Form from "./Form";
import Card from "./Card";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container className="py-4">
      <Row className="g-4">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
