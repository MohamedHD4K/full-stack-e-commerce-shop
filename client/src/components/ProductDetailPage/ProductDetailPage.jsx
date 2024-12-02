import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const ProductDetailPage = () => {
  const location = useLocation();
  const data = location.state;

  document.title = data.title


  return (
    <Container>
      <Stack className="my-2">
        <Row
          className="bg-light m-2 border rounded p-2"
        >
          <Col className="m-3">
            <img src={data.img} className="img border rounded" />
          </Col>
          <Col
            className="border border-2 d-flex flex-column rounded p-4 m-3 text-dark"
            style={{ justifyContent: "space-between" }}
          >
            <div>
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
            <div className="d-flex flex-column">
              <p className="m-0">from : {data.user}</p>
              <hr className="divider" />
              <Button>Add To Cart</Button>
            </div>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default ProductDetailPage;
