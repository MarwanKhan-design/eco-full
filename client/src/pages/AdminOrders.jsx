import React, { useEffect, useState } from "react";
import { Table, Container, Badge } from "react-bootstrap";
import { getOrders } from "../api/order";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Dummy data — replace with fetch from your API
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Orders Management</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Price (PKR)</th>
            <th>Payment</th>
            <th>Delivery</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} onClick={() => navigate(`/order/${order._id}`)}>
              <td>{order._id}</td>
              <td>{order.user.name}</td>
              <td>{order.total}</td>
              <td>
                {/* <Badge bg={order.isPaid ? "success" : "danger"}>
                  {order.isPaid ? "Paid" : "Unpaid"}
                </Badge> */}
                {order.paymentMethod}
              </td>
              <td>
                <Badge bg={order.isDelivered ? "success" : "warning"}>
                  {order.isDelivered ? "Delivered" : "Pending"}
                </Badge>
              </td>
              <td>{moment(order.createdAt).format("MMMM Do YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrders;
