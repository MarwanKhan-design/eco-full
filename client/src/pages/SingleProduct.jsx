import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Card,
  Badge,
} from "react-bootstrap";
import { getProduct } from "../api/ProductApi";
import { useParams } from "react-router-dom";
import { postProductToCart } from "../api/cart";

const ProductPage = ({ cartItems }) => {
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({
    id: "123",
    name: "Product Not Found",
    price: 0,
    category: "",
    colors: [],
    estimatedDelivery: "",
    paymentMethods: [],
    imageUrl: "",
  });

  // Mock product data
  const product = {
    id: "123",
    name: "Product Not Found",
    price: 0,
    category: { name: "" },
    colors: [],
    estimatedDelivery: "",
    paymentMethods: [],
    imageUrl: "",
  };

  const handleAddToCart = async () => {
    console.log("product", productData._id);
    const res = await postProductToCart(productData._id, quantity);
    console.log(res.data);
  };

  const { id } = useParams();

  const getProductData = async () => {
    const res = await getProduct(id);
    if (res.data) {
      setProductData(res.data);
      console.log(res.data);
    } else {
      setProductData({
        id: "123",
        name: "Product Not Found",
        price: 0,
        category: { name: "" },
        colors: [],
        estimatedDelivery: "",
        paymentMethods: [],
        image: "",
      });
    }
  };

  const checkProductInCart = () => {
    const product = cartItems.find(
      (item) => productData._id === item.product._id
    );
    console.log("Check Product in Cart", product, productData._id);
    return product ? true : false;
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container className="py-5">
      <Row className="align-items-start">
        {/* Smaller Image */}
        <Col md={4}>
          <Image
            src={productData.image}
            alt={productData.name}
            fluid
            rounded
            className="border w-100"
          />
        </Col>

        {/* Product Details */}
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h2">{productData.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-success fs-4">
                ${productData.price}
              </Card.Subtitle>

              <p className="mb-2">
                <strong>Category:</strong> {productData.category.name}
              </p>

              {/* Colors */}
              <div className="mb-3">
                <strong>Available Colors:</strong>{" "}
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: color,
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>

              {/* Quantity Selector */}
              <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: "100px" }}
                />
              </Form.Group>

              {/* Estimated Delivery */}
              <p className="mb-2">
                <strong>Estimated Delivery:</strong> {product.estimatedDelivery}
              </p>

              {/* Payment Methods */}
              <div className="mb-3">
                <strong>Payment Methods:</strong>
                <div className="mt-1">
                  {product.paymentMethods.map((method, idx) => (
                    <Badge
                      key={idx}
                      bg="light"
                      text="dark"
                      className="me-2 mb-1"
                    >
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              {checkProductInCart() ? (
                <h4>Already In Cart</h4>
              ) : (
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => handleAddToCart()}
                >
                  Add to Cart
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
