import { useEffect, useState } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import productApi from "../../../api/products";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../public/anim.json";

function CardModal({ cart, onHide, ...res }) {
  const [product, setProducts] = useState("");

  const handelDeleteProduct = ({ target }) => {
    const product = cart.filter((item) => item.productId._id === target.id);
    const index = cart.indexOf(product[0]);
    index != -1 && cart.splice(index, 1);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, [product]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Modal
      {...res}
      className="text-dark"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form>
        <Modal.Header closeButton onClick={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "auto", height: "500px" }}>
          {cart.length != 0 ? (
            cart.map(({ productId, quantity }) => (
              <div
                style={{ height: "120px", position: "relative" }}
                className="m-2 p-2 d-flex gap-2 product rounded border"
                key={productId._id}
              >
                <div className="position-relativ border rounded ">
                  <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                    {quantity}
                  </span>
                  <img
                    className="img rounded "
                    style={{ width: "100px" }}
                    src={productId.img}
                  />
                </div>
                <div className="d-flex flex-column gap-1 ">
                  <div className="truncated-text">
                    <span> {productId.title}</span>
                    <div className="truncated-text">
                      <span>{productId.price}$</span>
                    </div>
                  </div>
                  <div className="truncated-text">
                    {productId.tags &&
                      productId.tags.map((item, index) => {
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
                  <CloseButton
                    id={productId._id}
                    className="p-2 close"
                    onClick={handelDeleteProduct}
                    style={{ left: "92%", top: "5px" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex flex-column gap-2 justify-content-center align-items-center h-100 ">
              <Lottie options={defaultOptions} height={100} width={100} />
              <p className="fs-3">No Products</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onHide}>
            Cancel
          </Button>
          {cart.length != 0 && (
            <Link
              to="/cart"
              className="btn btn-primary"
              state={cart}
              onClick={onHide}
            >
              Buy
            </Link>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CardModal;
