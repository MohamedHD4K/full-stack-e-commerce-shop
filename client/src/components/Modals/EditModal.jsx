import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardEdit from "../CardEdit";
import Tag from "../Tag";

function EditModal({
  onEdit,
  data,
  input,
  setInput,
  onHide,
  currentUser,
  id,
  setSelectedTags,
  ...res
}) {
  const tags = [
    "Electronics",
    "Clothes",
    "Food",
    "Kitchenware",
    "Toys",
    "Books",
    "Gift",
    "Clearance",
    "Sports",
    "Furniture",
  ];

  const handelChange = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleTagToggle = (value) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value]
    );
  };

  return (
    <Modal
      {...res}
      className="text-dark"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={onEdit} id={id}>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="fw-bold mb-1">Categories</div>
            {tags.map((tag , index) => <Tag key={index} value={tag} onToggle={handleTagToggle} />)}
          </div>
          <CardEdit
            handelChange={handelChange}
            setInput={setInput}
            input={input}
            data={data}
            currentUser={currentUser}
            className="p-0 m-2 m-auto shadow bg-dark text-light"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Cancel
          </Button>
          <input className="btn btn-success" type="submit" value="Edit" />
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default EditModal;
