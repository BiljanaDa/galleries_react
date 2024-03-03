import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth/slice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (userData.password !== userData.password_confirmation) {
      alert("Password and confirm password should be same!");
      return;
    }
    const regex = /[0-9]/;
    if (!regex.test(userData.password)) {
      alert("Please, insert at least one number");
      return;
    }
    if (userData.password.length < 8) {
      alert("Sorry, your password must contain 8 characters!");
      return;
    }
    if (!userData.terms) {
      alert("You must accept terms if you want to proceed!");
    }

    dispatch(register(userData));
    navigate("/");
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Control
                required
                placeholder="First name"
                value={userData.first_name}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Control
                required
                placeholder="Last name"
                value={userData.last_name}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Control
                required
                type="password"
                placeholder="Confirm password"
                value={userData.password_confirmation}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              controlId="formTerms"
              className="d-flex align-items-center"
            >
              <Form.Check
                required
                type="checkbox"
                label="Accept Terms and Conditions"
                checked={userData.terms}
                style={{ marginRight: "8px" }}
                onChange={(e) =>
                  setUserData({ ...userData, terms: e.target.checked })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
