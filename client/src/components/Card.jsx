import { CloseButton, Card as LittelCard } from "react-bootstrap";
import { Link } from "react-router-dom";

function Card({
  key,
  product,
  currentUser,
  handelDeleteProduct,
  handelEditProduct,
  handelAddToCart,
  ...res
}) {
  if (product.user === currentUser) {
    return (
      <LittelCard
        key={key}
        {...res}
        style={{ textDecoration: "none", width: "18rem" }}
      >
        <LittelCard.Img
          variant="top"
          className="img"
          style={{ height: "300px" }}
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
            <span className="fw-bold text-warning">{product.price}$</span>
            {product.user === currentUser ? (
              <span
                id={product.id}
                className="material-symbols-outlined flex-end p-2 fs-5 btn btn-warning"
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
            ) : (
              <div>
                <span
                  className="material-symbols-outlined flex-end fs-5 btn btn-warning mx-2"
                  onClick={handelAddToCart}
                >
                  shopping_cart
                </span>
                <Link
                  className="material-symbols-outlined flex-end fs-5 btn btn-warning "
                  to={"/product-details/" + product._id}
                >
                  details
                </Link>
              </div>
            )}
          </div>
          <CloseButton
            id={product._id}
            className="close p-2 rounded-circle"
            onClick={handelDeleteProduct}
          />
        </LittelCard.Body>
      </LittelCard>
    );
  } else {
    return;
  }
}

export default Card;
