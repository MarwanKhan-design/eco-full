import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

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

  // const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    }

    console.log(user);
  }, [isLoggedIn]);

  return (
    <Navbar expand="lg" variant="dark" style={navbarStyle}>
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
            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <>
                    <Nav.Link as={Link} to="/admin" style={linkStyle}>
                      Admin
                    </Nav.Link>
                    <Nav.Link as={Link} to="/create/product" style={linkStyle}>
                      Create Product
                    </Nav.Link>
                  </>
                ) : (
                  <></>
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
