import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const AdminProductList = ({
  products,
  editId,
  handleEdit,
  handleDelete,
  handleUpdate,
  editData,
  setEditData,
}) => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Product List</h1>
      {products.map((product) => (
        <Card key={product._id} className="mb-3">
          <Card.Body>
            {editId === product._id ? (
              <Form as={Row} className="align-items-center">
                <Col sm={4} className="mb-2 mb-sm-0">
                  <Form.Control
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    placeholder="Product Name"
                  />
                </Col>
                <Col sm={2} className="mb-2 mb-sm-0">
                  <Form.Control
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Price"
                  />
                </Col>
                <Col sm={2} className="mb-2 mb-sm-0">
                  <Form.Control
                    type="number"
                    value={editData.quantity}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    placeholder="Quantity"
                  />
                </Col>
                <Col sm={4} className="text-end">
                  <Button
                    variant="success"
                    onClick={() => handleUpdate(product._id)}
                    className="me-2"
                  >
                    Save
                  </Button>
                </Col>
              </Form>
            ) : (
              <Row className="align-items-center">
                <Col sm={4}>
                  <h5>{product.name}</h5>
                </Col>
                <Col sm={2}>
                  <p>${product.price}</p>
                </Col>
                <Col sm={2}>
                  <p>{product.quantity} pcs</p>
                </Col>
                <Col sm={4} className="text-end">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(product)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default AdminProductList;
