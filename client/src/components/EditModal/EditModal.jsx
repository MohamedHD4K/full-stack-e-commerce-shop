import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EditModal({
  onHide,
  data,
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
          <Modal.Title id="contained-modal-title-vcenter">{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            title={data.title}
            id={data.id}
            about={data.about}
            price={data.price}
            user={data.user}
            img={data.img}
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
