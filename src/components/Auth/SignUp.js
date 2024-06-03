import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import "../../css/auth.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../../Store/App";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const user = useSelector((state) => state.app.isloggedin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetail, setuserDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      let obj = {
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
      };
      let user = JSON.stringify(obj);
      localStorage.setItem("user", user);
      // localStorage.setItem('isloggedin',true)
      // dispatch(setLoginUser(obj));
      navigate("/sign-in");
      clearData(); // clear form
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 sign-up-form">
          <Form noValidate validated={validated} onSubmit={saveData}>
            <p className="heanding">Sign Up</p>
            <Row className="md-3">
              <Form.Group controlId="name">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  value={userDetail.name}
                  onChange={handleFormData}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please add user name
                </Form.Control.Feedback>
              </Form.Group>
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
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter confirm password"
                  value={userDetail.confirmPassword}
                  onChange={handleFormData}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter Confirm password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="footer">
              <Button variant="primary" type="submit" className="sign-up-btn">
                Save
              </Button>
              <Button type="button" className="clear-btn" onClick={clearData}>
                Clear
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
