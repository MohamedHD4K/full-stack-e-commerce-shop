import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({
  onHide,
  title,
  about,
  id,
  price,
  img,
  user,
  currentUser,
  ...res
}) {
  return (
    <Modal
      {...res}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="bg-dark rounded">
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            title={title}
            id={id}
            about={about}
            price={price}
            user={user}
            img={img}
            currentUser={currentUser}
            className="p-0 m-2"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default EditModal;
