import { useContext, useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar as LittelNavbar,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import auth from "../../api/auth";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handelShow = () => setShow(true);

  const handleCancel = () => setShow(false);

  const handelLogout = () => {
    setUser(null)
    auth.deleteToken(localStorage.getItem("token"))
    setShow(false)
  }

  return (
    <LittelNavbar className="bg-body-tertiary">

      <Container>
        <Nav>
          <Link to="/" className="nav-link">
            <LittelNavbar.Brand>Brand</LittelNavbar.Brand>
          </Link>
        </Nav>

        <Nav className="justify-content-end gap-4">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="" className="nav-link">
            Men
          </Link>

          <Link to="" className="nav-link">
            Women
          </Link>

          <Link to="" className="nav-link">
            Baby Collection
          </Link>

          <NavDropdown
            title="Pages"
            id="basic-nav-dropdown"
            className="no-arrow-dropdown"
          >
            <NavDropdown.Item>Page1</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Page2</NavDropdown.Item>
          </NavDropdown>

          <Link to="" className="nav-link">
            Contact
          </Link>
        </Nav>

        <Nav>
          {user ? (
            <div>
              <Button
                onClick={handelShow}
                variant="outline-dark rounded-circle p-2 mx-1"
                className="material-symbols-outlined"
              >
                logout
              </Button>
            </div>
          ) : (
            <Link to="/register">
              <Button
                variant="outline-dark rounded-circle p-2 mx-1"
                className="material-symbols-outlined"
              >
                login
              </Button>
            </Link>
          )}

          <Link to="/register">
            <Button
              variant="outline-dark rounded-circle p-2 mx-1"
              className="material-symbols-outlined"
            >
              person
            </Button>
          </Link>

          <Link to="/register">
            <Button
              variant="outline-dark rounded-circle p-2 mx-1"
              className="material-symbols-outlined"
            >
              shopping_cart
            </Button>
          </Link>

          <Link to="/register">
            <Button
              variant="outline-dark rounded-circle p-2 mx-1"
              className="material-symbols-outlined"
            >
              search
            </Button>
          </Link>
        </Nav>
      </Container>


      <Modal className="text-dark" show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you shure you wont to logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handelLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </LittelNavbar>
  );
}

export default Navbar;
