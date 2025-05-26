import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const HeroSection = () => {
  const heroStyles = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  };

  const overlayStyles = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    padding: "3rem 0",
  };

  return (
    <div style={heroStyles}>
      <div style={overlayStyles}>
        <Container>
          <Row className="align-items-center min-vh-100">
            <Col md={6}>
              <h1 className="display-4 fw-bold">Inspire. Build. Succeed.</h1>
              <p className="lead">
                Join us in creating something extraordinary. Let’s bring your
                vision to life.
              </p>
              <Button variant="light" size="lg">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
