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
import { CreateOrder } from "../api/order";

const CheckoutForm = ({ cartItems, loading }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

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
    paymentMethod: "PayPal",
  });

  // Calculate cart total
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

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

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: formData.shippingAddress,
      paymentMethod: formData.paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    };

    onSubmit(orderData);
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
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            itemsPrice={itemsPrice}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;
