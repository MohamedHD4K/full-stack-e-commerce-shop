import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const data = location.state;

  document.title = "Cart";

  useEffect(() => {
    const totalPrice = data.reduce((acc, { productId, quantity }) => {
      return acc + Number(productId.price) * quantity;
    }, 0);
    setTotal(totalPrice);
  }, [data]);

  return (
    <Container>
      <h1 className="mt-3 fs-4">Shopping Bag</h1>
      <Row>
        <Col sm={9} className="border p-3 rounded my-2">
          <div
            style={{ justifyContent: "space-between" }}
            className="d-flex align-items-center gap-3"
          >
            <p className="fs-4 m-0 col-2 text-center">Product</p>
            <p className="fs-4 m-0 col-2 text-center">Name</p>
            <p className="fs-4 m-0 col-2 text-center">Quantity</p>
            <p className="fs-4 m-0 col-2 text-center">Price</p>
          </div>
          <hr />

          {data.map(({ productId, quantity }, index) => {
            return (
              <div key={index}>
                <div
                  style={{ justifyContent: "space-between" }}
                  className="d-flex gap-3 product-dark p-2 rounded"
                >
                  <div className="col-2 d-flex text-center align-items-center">
                    <img
                      src={productId.img}
                      alt={productId.title}
                      className="p-0 img border rounded"
                    />
                  </div>
                  <div className="col-2 d-flex text-center justify-content-center flex-column">
                    <div className="fs-5">{productId.title}</div>
                  </div>
                  <div className="col-2 d-flex text-center justify-content-center flex-column">
                    <div>{quantity}</div>
                  </div>
                  <div className="col-2 d-flex text-center justify-content-center flex-column">
                    <div>${productId.price}</div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </Col>

        <Col sm={3}>
          <div style={{ position: "sticky", top: "10px" }}>
            <div className="border rounded mt-2 p-3">
              <p className="fs-4">Order Summary</p>
              <hr />
              {data.map(({ productId, quantity }, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <p>
                      {quantity} x {productId.title}
                    </p>
                    <p>${productId.price}</p>
                  </div>
                );
              })}
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p>Cargo</p>
                <p>${total < 100 ? 10 : 0}</p>
              </div>

              <hr />
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p className="m-0">Total</p>
                <p className="m-0">${total >= 100 ? total : total + 10}</p>
              </div>
            </div>
            <Button className="w-100 my-2">Buy</Button>
          </div>
          <div className="text-dark rounded bg-light p-2" style={{fontSize:"15px"}}>
            Purchases must be at least $100 or more for the recommendation to be
            free.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
