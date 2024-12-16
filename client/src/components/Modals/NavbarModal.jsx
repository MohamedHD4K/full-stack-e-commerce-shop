import { Modal, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarModal = ({ show, onHide, user, setShowLogoutModal }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav className="flex-column">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/clothes" className="nav-link">
            Clothes
          </Link>
          <Link to="/furniture" className="nav-link">
            Furniture
          </Link>
          <Link to="/electronics" className="nav-link">
            Electronics
          </Link>
          <Link to="/sell" className="nav-link">
            Create New Sell
          </Link>
          <Link to="/my-sellers" className="nav-link">
            My Sellers
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          {user ? (
            <Button
              onClick={() => {
                setShowLogoutModal(true);
                onHide();
              }}
              variant="outline-danger"
              className="mt-3"
            >
              Logout
            </Button>
          ) : (
            <Link to="/register" className="btn btn-outline-primary mt-3">
              Login / Register
            </Link>
          )}
        </Nav>
      </Modal.Body>
    </Modal>
  );
};

export default NavbarModal;
