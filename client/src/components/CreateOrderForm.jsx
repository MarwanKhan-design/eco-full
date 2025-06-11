import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const CreateOrderForm = ({
  validated,
  handleSubmit,
  formData,
  handleInputChange,
  setPaymentMethod,
  loading,
  cartItems,
  paymentMethod,
}) => {
  return (
    <>
      <Card className="mb-4">
        <Card.Header as="h5">Shipping Address</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullName"
                value={formData.shippingAddress.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your full name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                name="address"
                value={formData.shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your address.
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="city"
                  value={formData.shippingAddress.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your city.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="postalCode"
                  value={formData.shippingAddress.postalCode}
                  onChange={handleInputChange}
                  placeholder="Enter postal code"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide your postal code.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group controlId="country" className="mb-4">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                name="country"
                value={formData.shippingAddress.country}
                onChange={handleInputChange}
                placeholder="Enter country"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your country.
              </Form.Control.Feedback>
            </Form.Group>

            <Card className="mb-4">
              <Card.Header as="h5">Payment Method</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="PayPal or Credit Card"
                    id="paypal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="Stripe"
                    id="stripe"
                    name="paymentMethod"
                    value="Stripe"
                    checked={paymentMethod === "Stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Processing...</span>
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateOrderForm;
