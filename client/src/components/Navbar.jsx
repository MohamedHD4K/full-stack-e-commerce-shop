import { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar as BootstrapNavbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";
import auth from "../../api/auth";
import CartModal from "./Modals/CartModal";
import LogoutModal from "./Modals/LogoutModal";
import SearchModal from "./Modals/SearchModal";
import NavbarModal from "./Modals/NavbarModal";

const Navbar = ({ cart }) => {
  const { user, setUser } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showNavbarModal, setShowNavbarModal] = useState(false);

  const handleResize = () => setScreenWidth(window.innerWidth);

  const handleLogout = () => {
    setUser(null);
    auth.deleteToken(localStorage.getItem("token"));
    setShowLogoutModal(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Show regular navbar if screen is wider than 1000px */}
      {screenWidth > 1000 ? (
        <BootstrapNavbar className="bg-body-tertiary">
          <Container>
            <Nav>
              <Link to="/" className="nav-link">
                <BootstrapNavbar.Brand>E-Shop</BootstrapNavbar.Brand>
              </Link>
            </Nav>
            <Nav className="justify-content-end gap-4">
              {["Home", "Clothes", "Furniture", "Electronics"].map((item) => (
                <Link to="/" className="nav-link" key={item}>
                  {item}
                </Link>
              ))}
              <NavDropdown title="Sell" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/sell" className="dropdown-item">
                    Create New Sell
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/my-sellers" className="dropdown-item">
                    My Sellers
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav>
            <Nav className="align-items-center">
              <Button
                variant="outline-dark rounded-circle p-2 mx-1 position-relative"
                className="material-symbols-outlined no-border"
                onClick={() => setCartModal(true)}
              >
                shopping_cart
                {cart.length > 0 && (
                  <span
                    className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "15px", fontFamily: "sans-serif" }}
                  >
                    {cart.length}
                  </span>
                )}
              </Button>
              <Button
                variant="outline-dark rounded-circle p-2 mx-1"
                className="material-symbols-outlined no-border"
                onClick={() => setSearchModal(true)}
              >
                search
              </Button>
              {user ? (
                <>
                  <Button
                    onClick={() => setShowLogoutModal(true)}
                    variant="outline-dark rounded-circle p-2 mx-1"
                    className="material-symbols-outlined no-border"
                  >
                    logout
                  </Button>
                  <Link to={`/user/${user.username}`}>
                    <img
                      src={user.img || "../person.jpg"}
                      alt="User"
                      className="img rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Link>
                </>
              ) : (
                <Link to="/register">
                  <Button
                    variant="outline-dark rounded-circle p-2 mx-1"
                    className="material-symbols-outlined no-border"
                  >
                    login
                  </Button>
                </Link>
              )}
            </Nav>
          </Container>
        </BootstrapNavbar>
      ) : (
        // Show modal trigger if screen is smaller than 1000px
        <BootstrapNavbar className="bg-body-tertiary py-3">
          <Container>
            <Link to="/" className="nav-link ">
              <BootstrapNavbar.Brand>E-Shop</BootstrapNavbar.Brand>
            </Link>
            <div>
              <Button
                variant="outline-dark rounded-circle p-2 mx-1 position-relative"
                className="material-symbols-outlined no-border"
                onClick={() => setCartModal(true)}
              >
                shopping_cart
                {cart.length > 0 && (
                  <span
                    className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "15px", fontFamily: "sans-serif" }}
                  >
                    {cart.length}
                  </span>
                )}
              </Button>
              <Button
                onClick={() => setShowNavbarModal(true)}
                variant="outline-dark material-symbols-outlined no-border rounded-circle p-2 mx-1"
              >
                Menu
              </Button>
            </div>
          </Container>
        </BootstrapNavbar>
      )}

      {/* Navbar Modal */}
      <NavbarModal
        show={showNavbarModal}
        onHide={() => setShowNavbarModal(false)}
        user={user}
        setShowLogoutModal={setShowLogoutModal}
      />

      {/* Modals */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        handleCancel={() => setShowLogoutModal(false)}
        handelLogout={handleLogout}
      />
      <CartModal
        cart={cart}
        show={cartModal}
        onHide={() => setCartModal(false)}
      />
      <SearchModal onHide={() => setSearchModal(false)} show={searchModal} />
    </>
  );
};

export default Navbar;
