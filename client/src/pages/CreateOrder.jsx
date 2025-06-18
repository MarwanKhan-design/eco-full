import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
  Alert,
  Spinner,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateOrderForm from "../components/CreateOrderForm";
import { OrderSummary } from "../components/OrderSummary";
import { createOrder } from "../api/order";

const CheckoutForm = ({ cartItems, loading, setCartItems }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const userInfo = JSON.parse(localStorage.getItem("user"));

  // Form state
  const [formData, setFormData] = useState({
    shippingAddress: {
      fullName: userInfo?.name || "",
      address: userInfo?.address || "",
      city: userInfo?.city || "",
      postalCode: userInfo?.postalCode || "",
      country: userInfo?.country || "",
    },
    paymentMethod: "COD",
  });

  // Calculate cart total
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalPrice = itemsPrice.toFixed(2);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    }
  }, [userInfo, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      shippingAddress: {
        ...formData.shippingAddress,
        [name]: value,
      },
    });
  };

  const submitOrder = async (orderData) => {
    const res = await createOrder(orderData);
    if (res.status === 200 || 201) {
      setCartItems([]);
    }
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress: formData.shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice,
      total: totalPrice,
    };

    submitOrder(orderData);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        <Col md={8}>
          <CreateOrderForm
            validated={validated}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            setPaymentMethod={setPaymentMethod}
            loading={loading}
            cartItems={cartItems}
            paymentMethod={paymentMethod}
          />
        </Col>
        <Col md={4}>
          <OrderSummary
            cartItems={cartItems}
            totalPrice={totalPrice}
            itemsPrice={itemsPrice}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
