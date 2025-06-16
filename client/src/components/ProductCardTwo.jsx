import React from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/productCardTwo.css";
import { useNavigate } from "react-router-dom";

const ProductCardTwo = ({ product, handleAddToCart, checkProductInCart }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card position-relative">
      <Card className="border-0 rounded-0 overflow-hidden bg-light">
        <div className="position-relative">
          <Card.Img
            src={product.image}
            alt={product.name}
            className="product-image"
            onClick={() => navigate(`/product/${product._id}`)}
          />

          {/* Hover Overlay */}
          <div className="overlay d-flex align-items-center justify-content-center">
            {checkProductInCart(product._id) ? (
              <p className="fw-semibold text-light shadow-sm">
                Already in Cart
              </p>
            ) : (
              <Button
                variant="light"
                className="fw-semibold text-dark shadow-sm"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>

        <Card.Body
          className="bg-white px-2 py-3"
          onClick={() => navigate(`/product/${product._id}`)}
          style={{ cursor: "pointer" }}
        >
          <Card.Title className="fs-6 fw-semibold mb-1">
            {product.name}
          </Card.Title>
          <Card.Text className="text-muted mb-2">
            {product.description}
          </Card.Text>
          <div>
            <span className="fw-bold text-dark me-2">
              Price: {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductCardTwo;
