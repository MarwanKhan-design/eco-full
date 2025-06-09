import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/hero.css";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ heading, subHeading, showButton }) => {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center">
          <Col className="text-white text-center">
            <h1 className="hero-title">{heading.toLocaleUpperCase()}</h1>
            <p className="hero-subtitle">{subHeading}</p>
            {showButton && (
              <button
                className="btn btn-primary btn-lg hero-cta"
                onClick={() => navigate("/")}
              >
                Shop Now
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
