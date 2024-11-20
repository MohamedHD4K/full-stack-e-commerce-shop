import { Link } from "react-router-dom";
import Input from "../Input";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import products from "../../../api/products";
import { toast, ToastContainer } from "react-toastify";

function SellPage({ history }) {
  const [data, setData] = useState({
    title: "",
    about: "",
    price: null,
    img: "",
  });

  const handelChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await products.postProduct(data);
      toast.success(data.title + " Created");
      setData({
        title: "",
        about: "",
        price: "",
        img: "",
      });
      history.push("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return toast.error(error.response.data);
      }
    }
  };

  return (
    <Container style={{ height: "90vh" }} className="d-flex align-items-center">
      <form
        className="bg-light text-dark p-4 rounded shadow "
        style={{ margin: "auto", width: "600px" }}
        onSubmit={handelSubmit}
      >
        <h1 className="fw-bold">Selling Product</h1>
        <hr className="divider" />

        <Stack gap={4}>
          <Input
            title="Title"
            id="title"
            value={data.title}
            labelClass="fw-bold"
            label="Title"
            handelChange={handelChange}
            className="shadow-sm"
          />
          <Input
            title="About"
            id="about"
            value={data.about}
            labelClass="fw-bold"
            label="About"
            handelChange={handelChange}
            className="shadow-sm"
          />
          <Input
            title="Price"
            type="number"
            id="price"
            value={data.price}
            labelClass="fw-bold"
            label="Price"
            handelChange={handelChange}
            className="shadow-sm"
          />
          <Input
            title="Url Image"
            type="url"
            id="img"
            value={data.img}
            label="Imege"
            labelClass="fw-bold"
            handelChange={handelChange}
            className="shadow-sm"
          />
          <hr className="divider" />
          <Input type="submit" value="Create" className="btn btn-primary" />
        </Stack>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default SellPage;
