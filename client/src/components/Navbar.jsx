import { useContext, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Tooltip,
  OverlayTrigger,
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

  const handelSearchModalShow = () => setSearchModal(true);
  const handelSearchModalCansel = () => setSearchModal(false);

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
            <LittelNavbar.Brand>E-Shope</LittelNavbar.Brand>
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

          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </Nav>

        <Nav className="align-items-center">
          {user ? (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-disabled">Logout</Tooltip>}
            >
              <span className="d-inline-block">
                <Button
                  onClick={handelShow}
                  variant="outline-dark rounded-circle p-2 mx-1"
                  className="material-symbols-outlined no-border"
                >
                  logout
                </Button>
              </span>
            </OverlayTrigger>
          ) : (
            <Link to="/register">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="tooltip-disabled">Login</Tooltip>}
              >
                <span className="d-inline-block">
                  <Button
                    variant="outline-dark rounded-circle p-2 mx-1"
                    className="material-symbols-outlined no-border"
                  >
                    login
                  </Button>
                </span>
              </OverlayTrigger>
            </Link>
          )}
          <Link to="/register">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-disabled">Registeri</Tooltip>}
            >
              <span className="d-inline-block">
                <Button
                  variant="outline-dark rounded-circle p-2 mx-1"
                  className="material-symbols-outlined no-border"
                >
                  edit_square
                </Button>
              </span>
            </OverlayTrigger>
          </Link>
          
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Cart</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                variant="outline-dark rounded-circle p-2 mx-1 position-relative"
                className="material-symbols-outlined no-border"
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
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Search</Tooltip>}
          >
            <span className="d-inline-block">
              <Button
                variant="outline-dark rounded-circle p-2 mx-1"
                className="material-symbols-outlined no-border"
                onClick={handelSearchModalShow}
              >
                search
              </Button>
            </span>
          </OverlayTrigger>

          <Link to={"/user/" + user.username}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip-disabled">{user.username}</Tooltip>}
            >
              <span className="d-inline-block mx-1">
                <img
                  src={user.img || "../person.jpg"}
                  className="img rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </span>
            </OverlayTrigger>
          </Link>
        </Nav>
      </Container>

      <LogoutModal
        show={show}
        onHide={handleCancel}
        handleCancel={handleCancel}
        handelLogout={handelLogout}
      />
      <CartModal cart={cart} show={cartModal} onHide={handleCartModalCancel} />
      <SearchModal onHide={handelSearchModalCansel} show={searchModal} />
    </LittelNavbar>
  );
}

export default Navbar;
