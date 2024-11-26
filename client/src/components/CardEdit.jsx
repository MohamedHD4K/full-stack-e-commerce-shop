import { Card as LittelCard, Stack } from "react-bootstrap";

function CardEdit({ handelChange, input, data, ...res }) {
  return (
    <LittelCard {...res} style={{ width: "18rem" }}>
      <LittelCard.Img
        variant="top"
        className="img"
        style={{ height: "300px" }}
        src={input.img != undefined ? input.img : data.img}
      />
      <Stack gap={2} className="m-3">
        <input
          placeholder="Title"
          className="fs-5 form-control"
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
          className="form-control fw-bold text-warning"
          value={input.price != undefined ? input.price : data.price}
          name="price"
          onChange={handelChange}
        />
      </Stack>
    </LittelCard>
  );
}

export default CardEdit;
