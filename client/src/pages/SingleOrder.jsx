import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { getOrder, updateOrderStatus } from "../api/order";
import { useParams } from "react-router-dom";
import moment from "moment";

const SingleOrder = () => {
  const [orderData, setOrderData] = useState();
  const [status, setStatus] = useState("pending");
  const { id } = useParams();
  const getOrderById = async () => {
    try {
      const res = await getOrder(id);
      console.log("OrderData", res.data);
      setOrderData(res.data);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    setStatus(updatedStatus);
  };

  const handleUpdateOrderStatus = async () => {
    const res = await updateOrderStatus(orderData._id, status);
    if (res.status === 200) {
      console.log("Updated Status");
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);
  return !orderData ? (
    <h2>Order Not Found</h2>
  ) : (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">Order #{orderData._id}</h5>
        </Card.Header>
        <Card.Body>
          {/* Order Info */}
          <Row className="mb-4">
            <Col md={6}>
              <p>
                <strong>Customer Name:</strong> {orderData.user.name}
              </p>
              <p>
                <strong>Email:</strong> {orderData.user.email}
              </p>
              {/* <p>
                <strong>Phone:</strong> +92-300-1234567
              </p> */}
            </Col>
            <Col md={6}>
              <p>
                <strong>Total Amount:</strong> Rs. {orderData.total}
              </p>
              <p>
                <strong>Payment Method:</strong> {orderData.paymentMethod}
              </p>
              <p>
                <strong>Placed On:</strong>{" "}
                {moment(orderData.createdAt).format("MMMM Do YYYY")}
              </p>
            </Col>
          </Row>

          {/* Status Update */}
          <Form>
            <Form.Group controlId="orderStatus">
              <Form.Label>
                <strong>Update Order Status</strong>
              </Form.Label>
              <Form.Select
                className="mb-3"
                value={status}
                onChange={(e) => handleStatusChange(e)}
              >
                <option value={"pending"}>Pending</option>
                <option value={"processing"}>Processing</option>
                <option value={"shipped"}>Shipped</option>
                <option value={"delivered"}>Delivered</option>
                <option value={"cancelled"}>Cancelled</option>
              </Form.Select>
              <Button
                variant="primary"
                onClick={() => handleUpdateOrderStatus()}
              >
                Update Status
              </Button>
            </Form.Group>
          </Form>

          {/* Shipping Address */}
          <hr />
          <h6 className="mt-4">Shipping Address</h6>
          <p>{orderData.shippingAddress.address}</p>

          {/* Ordered Items */}
          <hr />
          <h6 className="mt-4">Ordered Items</h6>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.products.map((product) => (
                <tr>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity + product.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleOrder;
