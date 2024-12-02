import Input from "../Input";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import products from "../../../api/products";
import Tag from '../Tag';
import { toast, ToastContainer } from "react-toastify";

function SellPage({ history }) {
  const [selectedTags, setSelectedTags] = useState([]);

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

  const [data, setData] = useState({
    title: "",
    about: "",
    price: null,
    img: "",
    tags: [],
  });
  document.title = "New Product"

  const handleTagToggle = (value) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(value)
        ? prevTags.filter((tag) => tag !== value)
        : [...prevTags, value]
    );
  };

  const handelChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...data, tags: selectedTags };

      await products.postProduct(updatedData);
      toast.success(data.title + " Created");
      setData({
        title: "",
        about: "",
        price: "",
        img: "",
        tags: [],
      });
      setSelectedTags([]);
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
    <Container>
      <form
        className="bg-light text-dark p-4 mx-auto rounded shadow "
        style={{ width: "600px", scale: ".9", transform: "translateY(-25px)" }}
        onSubmit={handelSubmit}
      >
        <h3 className="fw-bold">Selling Product</h3>
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
          <div>
            <div className="fw-bold mb-1">Categories</div>
            {tags.map((tag , index) => <Tag key={index} value={tag} onToggle={handleTagToggle} />)}
          </div>

          <hr className="divider" />
          <Input type="submit" value="Create" className="btn btn-primary" />
        </Stack>
      </form>
      <ToastContainer />
    </Container>
  );
}


export default SellPage;
