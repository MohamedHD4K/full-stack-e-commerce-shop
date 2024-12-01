import { Modal } from "react-bootstrap";

const SearchModal = ({ onHide, ...res }) => {
  return (
    <Modal size="lg" {...res}>
      <div className="input-group">
        <span
          className="material-symbols-outlined input-group-text bg-light border-0"
          id="search"
        >
          search
        </span>
        <input
          type="text"
          className="form-control border-0 "
          placeholder="Search and find the product"
          aria-describedby="search"
        />
        <span
          className="material-symbols-outlined btn btn-light border-0 input-group-text"
          id="close"
          onClick={onHide}
        >
          close
        </span>
      </div>
    </Modal>
  );
};

export default SearchModal;
