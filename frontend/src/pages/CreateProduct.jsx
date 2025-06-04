import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";
import { CreateProduct } from "../api/ProductApi";
import { useNavigate } from "react-router-dom";

const AdminProductForm = ({ products, setProducts, categories }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: null,
    category: "",
  });

  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.quantity ||
      !form.image ||
      !form.category
    ) {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);
    formData.append("image", form.image);

    setUploading(true);
    setMessage("");

    try {
      const res = await CreateProduct(formData);
      if (res.status === 200) {
        setProducts([res.data, ...products]);
        setMessage("Product added successfully!");
        setForm({
          name: "",
          price: "",
          quantity: "",
          image: null,
          category: "",
        });
        setPreview("");
        navigate("/admin");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card bg="dark" text="light">
            <Card.Body>
              <Card.Title className="mb-4 text-center">
                Add New Product
              </Card.Title>

              {message && <Alert variant="warning">{message}</Alert>}

              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="productName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Enter product price"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="productQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Enter product quantity"
                  />
                </Form.Group>

                <Form.Group controlId="exampleSelect">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={handleChange}
                    name="category"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => {
                      return (
                        <option value={category._id}>{category.name}</option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="productImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>

                {preview && (
                  <div className="mb-3 text-center">
                    <Image
                      src={preview}
                      alt="Preview"
                      fluid
                      rounded
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <Button variant="primary" type="submit" disabled={uploading}>
                    {uploading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Uploading...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProductForm;
