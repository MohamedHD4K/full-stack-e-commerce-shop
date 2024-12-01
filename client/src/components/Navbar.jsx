import { useContext, useState } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar as LittelNavbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import auth from "../../api/auth";
import CartModal from "./Modals/CartModal";
import LogoutModal from "./Modals/LogoutModal";
import SearchModal from "./Modals/SearchModal";

function Navbar({ cart }) {
  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const handelShow = () => setShow(true);
  const handleCancel = () => setShow(false);

  const handleCartModalShow = () => setCartModal(true);
  const handleCartModalCancel = () => setCartModal(false);

  const handelSearchModalShow = () => setSearchModal(true)
  const handelSearchModalCansel = () => setSearchModal(false)

  const handelLogout = () => {
    setUser(null);
    auth.deleteToken(localStorage.getItem("token"));
    setShow(false);
  };

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
            Clothes
          </Link>

          <Link to="" className="nav-link">
            Furniture
          </Link>

          <Link to="" className="nav-link">
            Electronics
          </Link>

          <NavDropdown
            title="Sell"
            id="basic-nav-dropdown"
            className="no-arrow-dropdown"
          >
            <NavDropdown.Item className="p-0">
              <Link className="dropdown-item" to="/sell">
                Creat New Sell
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item className="p-0">
              <Link className="dropdown-item" to="/my-sellers">
                My Sellers
              </Link>
            </NavDropdown.Item>
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

          <Button
            variant="outline-dark rounded-circle p-2 mx-1 position-relative"
            className="material-symbols-outlined"
            onClick={handleCartModalShow}
          >
            shopping_cart
            <span
              style={{ fontFamily: "sans-serif", fontSize: "12px" }}
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {cart.length > 0 && cart.length}
            </span>
          </Button>

            <Button
              variant="outline-dark rounded-circle p-2 mx-1"
              className="material-symbols-outlined"
              onClick={handelSearchModalShow}
            >
              search
            </Button>
        </Nav>
      </Container>

      <LogoutModal show={show} onHide={handleCancel} handleCancel={handleCancel} handelLogout={handelLogout}  />
      <CartModal cart={cart} show={cartModal} onHide={handleCartModalCancel} />
      <SearchModal onHide={handelSearchModalCansel} show={searchModal}/>
    </LittelNavbar>
  );
}

export default Navbar;
