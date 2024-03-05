import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "../store/auth/selectors";
import { logout } from "../store/auth/slice";

export const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Gallery App
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          All Galleries
        </Nav.Link>
        {isAuthenticated && (
          <Nav.Link as={Link} to="/create">
            Create Gallery
          </Nav.Link>
        )}
      </Nav>
      <Nav>
        {isAuthenticated ? (
          <>
            <Navbar.Text>
              <span style={{ marginRight: "10px" }}>
                Welcome, {activeUser?.first_name} {activeUser?.last_name}!
              </span>
            </Navbar.Text>
            <Nav.Link as={Link} to="/galleries/my-galleries">
              My Galleries
            </Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
