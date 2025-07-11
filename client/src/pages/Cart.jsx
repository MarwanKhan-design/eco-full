import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { getCart, postProductToCart } from "../api/cart";
import HeroSection from "../components/Hero";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  // Sample cart items data

  // Calculate total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal;

  const changeQuantity = async (quantity, productId, symbol) => {
    if (symbol === "-" && quantity !== 1) {
      const res = await postProductToCart(productId, quantity + 1);
      if (res.status === 200) {
        setCartItems(
          cartItems.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: quantity - 1 }
              : { ...item }
          )
        );
      }
    } else if (symbol === "+") {
      const res = await postProductToCart(productId, quantity + 1);
      if (res.status === 200) {
        console.log("responce 200");
        setCartItems(
          cartItems.map((item) =>
            item.product._id === productId
              ? { ...item, quantity: quantity + 1 }
              : { ...item }
          )
        );
      }
    }
  };

  return (
    <>
      <HeroSection
        heading={"Cart"}
        subHeading={"Checkout Our Amazing Products"}
      />
      <Container className="mt-4">
        {/* Cart and Checkout Section */}
        <Row>
          {/* Cart Items - Left Side */}
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header as="h5">
                Your Cart ({cartItems.length} items)
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product_id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <strong>{item.product.name}</strong>
                        </Col>
                        <Col md={2}>${item.product.price.toFixed(2)}</Col>
                        <Col md={2}>
                          {" "}
                          <Badge
                            style={{ cursor: "pointer" }}
                            bg="secondary"
                            onClick={() =>
                              changeQuantity(
                                item.quantity,
                                item.product._id,
                                "-"
                              )
                            }
                          >
                            -
                          </Badge>
                          {item.quantity} Qty:{" "}
                          <Badge
                            bg="primary"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              changeQuantity(
                                item.quantity,
                                item.product._id,
                                "+"
                              )
                            }
                          >
                            +
                          </Badge>
                        </Col>
                        <Col md={2} className="text-end">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Checkout Options - Right Side */}
          <Col md={4}>
            <Card>
              <Card.Header as="h5">Order Summary</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span>${total}</span>
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => navigate("/order")}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-2"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
