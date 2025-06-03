import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Products from "./Products";
import { useNavigate } from "react-router-dom";

const FeaturedProductCard = ({ product }) => {
  const { name, price, quantity, _id } = product;
  const cardStyle = {
    border: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    background: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
  };

  const hoverStyle = {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(product);
  }, []);

  return (
    <React.Fragment>
      <Card
        style={{ ...cardStyle, ...(isHovered ? hoverStyle : {}) }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/product/${_id}`)}
      >
        <Card.Img
          variant="top"
          src={product.image ? product.image : "https://placehold.co/600x400"}
          style={{ height: "220px", objectFit: "cover" }}
        />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold">{name}</Card.Title>
          <Card.Text style={{ fontSize: "1.1rem", color: "#333" }}>
            ${price}
          </Card.Text>

          <Button variant="primary" className="me-2 mb-2">
            Buy Now
          </Button>
          <Button variant="success" className="me-2 mb-2">
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default FeaturedProductCard;
