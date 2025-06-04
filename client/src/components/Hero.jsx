import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/hero.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center">
          <Col className="text-white text-center">
            <h1 className="hero-title">Summer Collection 2023</h1>
            <p className="hero-subtitle">Up to 50% off on selected items</p>
            <button className="btn btn-primary btn-lg hero-cta">
              Shop Now
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;
