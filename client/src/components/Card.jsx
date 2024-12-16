import { useCallback , useState } from "react";
import { CloseButton, Card as LittelCard } from "react-bootstrap";
import { Link } from "react-router-dom";

function Card({
  product,
  currentUser,
  handelDeleteProduct,
  handelEditProduct,
  calledIn,
  handleCartUpdate,
  cart,
  ...res
}) {
  const [inCart, setInCart] = useState(0);

  const onAdd = useCallback(() => {
    setInCart((c) => c + 1);
    handleCartUpdate(product, inCart + 1);
  }, [product, inCart, handleCartUpdate]);

  const onRemove = useCallback(() => {
    setInCart((c) => Math.max(0, c - 1));
    handleCartUpdate(product, Math.max(0, inCart - 1));
  }, [product, inCart, handleCartUpdate]);

  const handelLoad = useCallback(() => {
    cart.map((item) => {
      if (item.productId._id != product._id) return;
      setInCart(item.quantity);
      if (item.quantity > 0) handleCartUpdate(item.productId, inCart);
    });
  }, [cart, handleCartUpdate, product._id, inCart]);

  

  if (calledIn === "home") {
    return (
      <LittelCard onLoad={handelLoad} {...res} style={{ width: "15rem" ,flexGrow:"1" , maxWidth:"400px"}}>
        <LittelCard.Img
          variant="top"
          className="img"
          style={{ height: "250px"}}
          src={product.img}
        />
        <LittelCard.Body>
          <LittelCard.Title className="fw-bold">
            {product.title}
          </LittelCard.Title>
          <LittelCard.Text className="truncated-text">
            {product.about}
          </LittelCard.Text>
          <div
            className="d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <span>${product.price}</span>
            <div>
              {inCart === 0 ? (
                <span
                  className="material-symbols-outlined flex-end fs-5 btn btn-dark mx-2"
                  onClick={onAdd}
                  id={product._id}
                >
                  shopping_cart
                </span>
              ) : (
                <div
                  className="btn-group mx-2"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={onRemove}
                    id={product._id}
                    type="button"
                    className="btn btn-primary material-symbols-outlined fs-6 p-1"
                  >
                    remove
                  </button>
                  <button type="button" className="btn btn-primary p-1 ">
                    {inCart}
                  </button>
                  <button
                    type="button"
                    onClick={onAdd}
                    id={product._id}
                    className="btn btn-primary material-symbols-outlined fs-6 p-1"
                  >
                    add
                  </button>
                </div>
              )}

              <Link
                className="material-symbols-outlined flex-end fs-5 btn btn-dark "
                to={"/product-details/" + product._id}
                state={product}
              >
                details
              </Link>
            </div>
          </div>
        </LittelCard.Body>
      </LittelCard>
    );
  } else if (product.user === currentUser) {
    return (
      <LittelCard {...res} style={{ textDecoration: "none", width: "15rem"  ,flexGrow:"1" , maxWidth:"400px"}}>
        <LittelCard.Img
          variant="top"
          className="img"
          style={{ height: "250px" }}
          src={product.img}
        />
        <LittelCard.Body>
          <LittelCard.Title className="fw-bold">
            {product.title}
          </LittelCard.Title>
          <LittelCard.Text className="truncated-text">
            {product.about}
          </LittelCard.Text>
          <div
            className="d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <span>${product.price}</span>
            <span
              id={product.id}
              className="material-symbols-outlined flex-end p-2 fs-5 btn btn-dark"
              onClick={() =>
                handelEditProduct({
                  title: product.title,
                  about: product.about,
                  price: product.price,
                  img: product.img,
                  id: product._id,
                  user: product.user,
                })
              }
            >
              edit
            </span>
          </div>
          <CloseButton
            id={product._id}
            className="close p-2 rounded-circle"
            onClick={handelDeleteProduct}
          />
        </LittelCard.Body>
      </LittelCard>
    );
  }
}

export default Card;
