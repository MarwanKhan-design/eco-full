import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/ProductApi";
import Form from "./Form";
import Card from "./Card";
import { Col, Container, Row } from "react-bootstrap";

const Products = ({ products, setProducts }) => {
  const [updateData, setUpdateData] = useState({});

  const handleUpdateProduct = (product) => {
    setUpdateData(product);
  };

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
