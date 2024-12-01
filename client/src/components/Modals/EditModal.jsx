import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardEdit from "../CardEdit";
import { useState } from "react";

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
            <Tags value="Electronics" onToggle={handleTagToggle} />
            <Tags value="Clothes" onToggle={handleTagToggle} />
            <Tags value="Food" onToggle={handleTagToggle} />
            <Tags value="Kitchenware" onToggle={handleTagToggle} />
            <Tags value="Toys" onToggle={handleTagToggle} />
            <Tags value="Books" onToggle={handleTagToggle} />
            <Tags value="Gift Cards" onToggle={handleTagToggle} />
            <Tags value="Clearance" onToggle={handleTagToggle} />
            <Tags value="Sports" onToggle={handleTagToggle} />
            <Tags value="Furniture" onToggle={handleTagToggle} />
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


function Tags({ value, onToggle }) {
  const [tag, setTag] = useState(true);

  const handleClick = () => {
    setTag((prev) => !prev);
    onToggle(value);
  };
  return (
    <div
      className={
        tag
          ? "btn btn-outline-dark rounded-pill m-1"
          : "btn btn-dark rounded-pill m-1"
      }
      onClick={handleClick}
    >
      {value}
    </div>
  );
}

export default EditModal;
