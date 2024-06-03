import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { userLogout } from "../Store/App";

function Menubar() {
  const isFullLayout = useSelector((state) => state.app.isFullLayout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navMenubarItems = [];
  const user = useSelector((state) => state.app.user);
  const isloggedin = localStorage.getItem("isloggedin");

  const redirectToPage = (to) => {
    navigate(`/${to}`);
  };

  const logOut = () => {
    dispatch(userLogout(null));
    localStorage.removeItem("isloggedin");
    navigate("/sign-in");
  };
  navMenubarItems.push({
    name: "Home",
    path: "/",
  });

  if (user && user.role === "SA") {
    navMenubarItems.push(
      {
        name: "Add Order",
        path: "add-item",
      },
      {
        name: "Home",
        path: "order-list",
      }
    );
  }
  if (user && (user.role === "ADMIN" || user.role === "SA")) {
    navMenubarItems.push(
      {
        name: "Seleling List",
        path: "seleling-list",
      },
      {
        name: "View Stock",
        path: "view-stock",
      }
    );
  }
  if (
    user &&
    (user.role === "ADMIN" || user.role === "SA" || user.role === "USER")
  ) {
    navMenubarItems.push(
      {
        name: "Buy product",
        path: "buy-product",
      },
      {
        name: "View Card",
        path: "view-card",
      }
    );
  }
  return (
    !isFullLayout && (
      <Navbar bg="dark" data-bs-theme="dark" className="mb-5">
        <Container>
          <Link to="/" className="navbar-brand"></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isloggedin &&
                navMenubarItems.map((item, index) => {
                  return (
                    <Link key={index} to={item.path} className="nav-link">
                      {item.name}
                    </Link>
                  );
                })}
            </Nav>
            <Nav>
              {!isloggedin ? (
                <>
                  <Button
                    variant="outline-success"
                    className="me-2"
                    onClick={() => redirectToPage("sign-in")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={() => redirectToPage("sign-up")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button className="ms-5 mt-1" onClick={logOut}>
                  LogOut
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
}

export default Menubar;
