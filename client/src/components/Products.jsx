import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/ProductApi";
import Form from "./Form";
import Card from "./Card";
import { Col, Container, Row } from "react-bootstrap";
import ProductCardTwo from "./ProductCardTwo";

const Products = ({ products, setProducts }) => {
  return (
    <Container className="py-4">
      <Row className="g-4">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCardTwo product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
