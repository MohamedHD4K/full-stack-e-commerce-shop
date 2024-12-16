import { useContext, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import productApi from "../../../api/products";
import UserContext from "../../context/userContext";

const ProductDetailPage = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [comment, setComment] = useState();
  const data = location.state;
  const [sendData, setSendData] = useState(data.comments || []);
  document.title = data.title;

  const handelSendComment = async (value) => {
    try {
      const updatedComments = [
        ...sendData,
        { text: value, user: user.username, img: user.img },
      ];

      setSendData(updatedComments);

      await productApi.updatComment({
        comments: updatedComments,
        id: data._id,
      });

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Stack className="my-2">
        <Row className="bg-light m-2 border rounded p-2 gap-3">
          <Col>
            <img src={data.img} className="img border rounded" />
          </Col>
          <Col
            className="border border-2 d-flex flex-column rounded p-4 text-dark"
            style={{ justifyContent: "space-between" }}
          >
            <div className="pb-3">
              <p className="fs-1 fw-bold">{data.title}</p>
              <p className="fs-5 text-primary fw-bold">{data.about}</p>
              <hr />
              <p className="fs-2 fw-2">${data.price}</p>

              {data.tags &&
                data.tags.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="badge text-bg-dark p-2 rounded-pill m-1"
                    >
                      {item}
                    </div>
                  );
                })}
            </div>

            {data.tags[0] === "Electronics" && (
              <div
                className="d-flex flex-column gap-3"
                style={{ height: "100px" }}
              >
                <h4 className="m-0">Colors</h4>
                <div className="d-flex gap-3">
                  <button className="color rounded-1 border border-dark border-3 btn btn-light"></button>
                  <button className="color rounded-1 border border-dark border-3 btn btn-dark"></button>
                  <button className="color rounded-1 border border-dark border-3 btn btn-secondary"></button>
                  <button className="color rounded-1 border border-dark border-3 btn btn-danger"></button>
                  <button className="color rounded-1 border border-dark border-3 btn btn-success"></button>
                  <button className="color rounded-1 border border-dark border-3 btn btn-primary"></button>
                </div>
              </div>
            )}
            {data.tags[0] === "Clothes" && (
              <div className="d-flex flex-column gap-3">
                <h4 className="m-0">Size</h4>
                <div className="d-flex gap-3">
                  <button className="color rounded-1 border border-dark border-3">
                    S
                  </button>
                  <button className="color rounded-1 border border-dark border-3">
                    M
                  </button>
                  <button className="color rounded-1 border border-dark border-3">
                    L
                  </button>
                  <button className="color rounded-1 border border-dark border-3">
                    XL
                  </button>
                </div>
              </div>
            )}

            <div className="d-flex flex-column">
              <p className="m-0">from : {data.user}</p>
              <hr className="divider" />
              <Button>Add To Cart</Button>
            </div>
          </Col>
        </Row>
        <div className="m-2 p-2">
          <h2>Product Comments</h2>
          <div className="d-flex align-items-center gap-3">
            <img
              className="img rounded-circle img border p-0"
              style={{ width: "50px", height: "50px" }}
              src={user.img ? user.img : "../person.jpg"}
            />
            <input
              className="form-control"
              placeholder="Add your comment ..."
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />

            <Button
              className="d-flex align-items-center gap-1"
              onClick={() => handelSendComment(comment)}
            >
              Send <span className="material-symbols-outlined fs-5">send</span>
            </Button>
          </div>
        </div>

        <>
          {sendData.map((comment) => {
            return (
              <div
                key={comment._id}
                className="bg-light text-dark rounded m-2 p-2"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    className="rounded-circle border p-0 img"
                    style={{
                      width: "50px",
                      height: "50px",
                      alignSelf: "start",
                    }}
                    src={comment.img || "../person.jpg"}
                  />
                  <div>
                    <p
                      className="m-0 text-secondary"
                      style={{ fontSize: "15px" }}
                    >
                      @{comment.user}
                    </p>
                    <p className="m-0">{comment.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </Stack>
    </Container>
  );
};

export default ProductDetailPage;
