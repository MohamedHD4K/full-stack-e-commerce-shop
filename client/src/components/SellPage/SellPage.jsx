import Input from "../Input";
import { useState } from "react";
import { Container, Stack } from "react-bootstrap";
import products from "../../../api/products";
import { toast, ToastContainer } from "react-toastify";

function SellPage({ history }) {
  const [selectedTags, setSelectedTags] = useState([]);

  console.log(selectedTags);

  const [data, setData] = useState({
    title: "",
    about: "",
    price: null,
    img: "",
    tags: [],
  });

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

          <hr className="divider" />
          <Input type="submit" value="Create" className="btn btn-primary" />
        </Stack>
      </form>
      <ToastContainer />
    </Container>
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

export default SellPage;
