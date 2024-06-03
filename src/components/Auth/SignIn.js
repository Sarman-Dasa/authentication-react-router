import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import "../../css/auth.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../../Store/App";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const user = useSelector((state) => state.app.isloggedin);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userDetail, setuserDetail] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState();
  const [validated, setValidated] = useState(false);

  // Set form data into variable as key value pair
  const handleFormData = (e) => {
    const { id, value } = e.target;
    setuserDetail((preview) => ({
      ...preview,
      [id]: value,
    }));
  };
  //Clear Form data
  const clearData = () => {
    setuserDetail({
      email: "",
      password: "",
    });
    setValidated(false);
  };

  const saveData = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const { email, password } = JSON.parse(localStorage.getItem("user"));

      if (userDetail.email === email && userDetail.password === password) {
        localStorage.setItem("isloggedin", true);
        const user = JSON.parse(localStorage.getItem("user"));
        user.role = role; // set select role to local-storege (testing purpose)
        //Note:: Set Api response user information

        let userStr = JSON.stringify(user);
        localStorage.setItem("user", userStr);
        dispatch(setLoginUser(user));
        navigate("/");
      } else {
        alert("Email & password not match!!");
      }
    }
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <Container>
      <Row>
        <Col className="col-6 sign-up-form">
          <Form noValidate validated={validated} onSubmit={saveData}>
            <p className="heanding">Sign Up</p>
            <Row className="md-3">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={userDetail.email}
                  onChange={handleFormData}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please add Email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={userDetail.password}
                  onChange={handleFormData}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="footer">
              <Button variant="primary" type="submit" className="sign-up-btn">
                Login
              </Button>
              <Button type="button" className="clear-btn" onClick={clearData}>
                Clear
              </Button>

              {/* Add role selection option for testing purpose only  */}
              <Form.Check
                inline
                label="Super Admin"
                name="group1"
                type="radio"
                value="SA"
                id={`inline-1`}
                className="ms-5"
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Admin"
                name="group1"
                type="radio"
                value="ADMIN"
                id={`inline-1`}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="User"
                name="group1"
                type="radio"
                value="USER"
                id={`inline-1`}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
