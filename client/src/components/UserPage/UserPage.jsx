import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../../../api/products";
import { Button, Col, Container, Row } from "react-bootstrap";
import Input from "../Input";

const UserPage = () => {
  const location = useLocation();
  const user = location.state;
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const handelChange = ({ target }) => {
    setValue({ ...value, [target.name]: target.value });
  };

  return (
    <Container>
      <Row className="m-3" style={{ minHeight: "80vh" }}>
        <Col
          className="d-flex flex-column bg-dark m-2 border p-4 rounded"
          style={{ justifyContent: "space-between" }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              className="img rounded-circle "
              style={{ height: "200px", width: "200px" }}
              src={user.img || "../person.jpg"}
            />
          </div>

          <Input
            type="text"
            value={user.username}
            handelChange={handelChange}
            id="username"
            title="Username"
            label="Username"
          />

          <Input
            type="text"
            value={user.email}
            handelChange={handelChange}
            id="email"
            title="Email"
            label="Email"
          />

          <Input
            type="text"
            value={user.img}
            handelChange={handelChange}
            id="image"
            title="Image URL"
            label="Image URL"
          />

          <div className="space-between">
            <span>ID : {user._id}</span>
            <Button variant="success px-4">Edit</Button>
          </div>
        </Col>

        <Col
          className="bg-dark m-2 border p-2 rounded overflow-auto"
          style={{ maxHeight: "80vh" }}
        >
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div key={product._id}>
                  {user._id === product.user && (
                    <div className="d-flex border p-2 mb-2 rounded w-100 bg-light text-dark align-items-center gap-3">
                      <img
                        className="img border border-dark shadow rounded"
                        style={{ height: "100px", width: "100px" }}
                        src={product.img}
                      />
                      <div>
                        <p className="m-1">Title : </p>
                        <p className="m-1">About : </p>
                        <p className="m-1">Price : </p>
                        {/* <p className="m-1">Product ID : </p> */}
                      </div>
                      <div>
                        <p className="m-1">{product.title}</p>
                        <p className="m-1">{product.about}</p>
                        <p className="m-1">${product.price}</p>
                        {/* <p className="m-1">{product._id}</p> */}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
