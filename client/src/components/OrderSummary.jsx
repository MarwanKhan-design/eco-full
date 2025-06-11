import React from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";

export const OrderSummary = ({
  cartItems,
  shippingPrice,
  totalPrice,
  itemsPrice,
}) => {
  return (
    <Card>
      <Card.Header as="h5">Order Summary</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col xs={6}>
                  {item.product.name} × {item.product.quantity}
                </Col>
                <Col xs={6} className="text-end">
                  ${(item.product.price * item.product.quantity).toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}

          <ListGroup.Item>
            <Row>
              <Col>Items</Col>
              <Col className="text-end">${itemsPrice.toFixed(2)}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col>Shipping</Col>
              <Col className="text-end">
                {shippingPrice === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  `$${shippingPrice.toFixed(2)}`
                )}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item className="fw-bold">
            <Row>
              <Col>Total</Col>
              <Col className="text-end">${totalPrice}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
