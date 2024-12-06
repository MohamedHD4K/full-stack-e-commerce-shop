import { Card as LittelCard } from "react-bootstrap";

function CardEdit({ handelChange, input, data, ...res }) {
  return (
    <LittelCard {...res}>
      <div className="d-flex">
        <div className=" m-2">
          <img
            className="img rounded"
            style={{ width: "200px" }}
            src={input.img != undefined ? input.img : data.img}
          />
        </div>
        <div
          className="d-flex flex-column w-100 m-2"
          style={{ justifyContent: "space-between" }}
        >
          <input
            placeholder="Title"
            className="form-control"
            value={input.title != undefined ? input.title : data.title}
            name="title"
            onChange={handelChange}
          />
          <input
            placeholder="About"
            className="form-control"
            value={input.about != undefined ? input.about : data.about}
            name="about"
            onChange={handelChange}
          />
          <input
            type="url"
            placeholder="Image URL"
            className="form-control"
            value={input.img != undefined ? input.img : data.img}
            name="img"
            onChange={handelChange}
          />
          <input
            type="number"
            placeholder="Price"
            className="form-control"
            value={input.price != undefined ? input.price : data.price}
            name="price"
            onChange={handelChange}
          />
        </div>
      </div>
    </LittelCard>
  );
}

export default CardEdit;
