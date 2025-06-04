import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

const CustomNavbar = ({ categories }) => {
  const navbarStyle = {
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(6px)",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
  };

  const [isAdmin, setIsAdmin] = useState(null);
  const { isLoggedIn, logout } = useAuth();

  // Sample categories - replace with your actual categories
  // const categories = [
  //   { name: "Beds", path: "/category/beds" },
  //   { name: "Sofas", path: "/category/sofas" },
  //   { name: "Chairs", path: "/category/chairs" },
  //   { name: "Tables", path: "/category/tables" },
  // ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    }
  }, [isLoggedIn]);

  return (
    <Navbar expand="lg" variant="dark" style={navbarStyle}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          MyBrand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Left-aligned nav (empty to push categories to center) */}
          <Nav className="me-auto"></Nav>

          {/* Center-aligned categories */}
          <Nav className="mx-auto">
            {categories.map((category) => (
              <Nav.Link
                key={category.name}
                as={Link}
                to={`/category/${category.name}`}
                style={linkStyle}
              >
                {category.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right-aligned auth links */}
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <>
                    <Nav.Link as={Link} to="/admin" style={linkStyle}>
                      Admin
                    </Nav.Link>
                    <Nav.Link as={Link} to="/create/product" style={linkStyle}>
                      Create Product
                    </Nav.Link>
                  </>
                )}
                <Button
                  variant="danger"
                  onClick={() => {
                    localStorage.clear();
                    logout();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={linkStyle}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" style={linkStyle}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
