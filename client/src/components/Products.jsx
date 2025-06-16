import React, { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../api/ProductApi";
import Form from "./Form";
import Card from "./Card";
import { Col, Container, Row } from "react-bootstrap";
import ProductCardTwo from "./ProductCardTwo";
import { postProductToCart } from "../api/cart";

const Products = ({ products, setProducts, setCartItems, cartItems }) => {
  const handleAddToCart = async (productId) => {
    const res = await postProductToCart(productId, 1);
    if (res.status === 200) {
      setCartItems(res.data);
    }
    console.log("cart", res.data);
  };
  return (
    <Container className="py-4">
      <Row className="g-4">
        {products.map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ProductCardTwo
              product={product}
              handleAddToCart={handleAddToCart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
