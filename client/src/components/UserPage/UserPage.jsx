import { useCallback, useContext, useEffect, useState } from "react";
import productApi from "../../../api/products";
import { Button, Col, Container, Row } from "react-bootstrap";
import Input from "../Input";
import userApi from "../../../api/users";
import UserContext from "../../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import animationData from "../../../public/loading.json";
import Lottie from "react-lottie";

const UserPage = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState({
    username: "",
    email: "",
    img: "",
  });

  useEffect(() => {
    document.title = user.username;
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response.data);
        setValue({ username: user.username, email: user.email, img: user.img });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [user]);

  const handelChange = useCallback(
    ({ target }) => {
      setValue({ ...value, [target.name]: target.value, id: user._id });
    },
    [value, user]
  );

  const handelEditUser = useCallback(async (e) => {
    e.preventDefault();
    try {
      await userApi.updateUser(value);
      toast.warning("you must login again to active the changes");
    } catch (error) {
      console.error(error);
    }
  } , [value]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      <Row className="m-3" style={{ minHeight: "80vh" }}>
        <Col
          className="d-flex flex-column  bg-dark m-2 border p-4 rounded"
          style={{ justifyContent: "space-between" }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              className="img rounded-circle "
              style={{ height: "200px", width: "200px" }}
              src={value.img ? value.img : "../person.jpg"}
            />
            <span
              className="bg-light text-dark p-1 px-3 rounded-pill border border-dark"
              style={{ transform: "translateY(-20px)", fontSize: "15px" }}
            >
              {value.username}
            </span>
          </div>
          <form className="d-flex flex-column gap-3">
            <Input
              type="text"
              value={value.username}
              handelChange={handelChange}
              id="username"
              title="Username"
              label="Username"
            />

            <Input
              type="text"
              value={value.email}
              handelChange={handelChange}
              id="email"
              title="Email"
              label="Email"
            />

            <Input
              type="text"
              value={value.img}
              handelChange={handelChange}
              id="img"
              title="Image URL"
              label="Image URL"
            />
          </form>

          <div className="space-between">
            <span>ID : {user._id}</span>
            <Button variant="success px-4" onClick={handelEditUser}>
              Edit
            </Button>
          </div>
          <ToastContainer />
        </Col>

        <Col
          className="bg-dark m-2 border p-2 rounded overflow-auto"
          style={{ maxHeight: "80vh" }}
        >
          {!loading ? (
            products.length > 0 &&
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
                      </div>
                      <div>
                        <p className="m-1">{product.title}</p>
                        <p className="m-1">{product.about}</p>
                        <p className="m-1">${product.price}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <Lottie options={defaultOptions} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
