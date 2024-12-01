import { Button, Modal } from "react-bootstrap";

const LogoutModal = ({ handleCancel, handelLogout, show }) => {
  return (
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
  );
};

export default LogoutModal;
