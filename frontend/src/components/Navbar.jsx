import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  const navbarStyle = {
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(6px)",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
  };

  return (
    <Navbar expand="lg" variant="dark" fixed="top" style={navbarStyle}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          MyBrand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={linkStyle}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/admin" style={linkStyle}>
              Admin
            </Nav.Link>

            <Button variant="outline-light" size="sm" className="ms-3">
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
