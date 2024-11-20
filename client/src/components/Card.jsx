import { CloseButton, Card as LittelCard } from "react-bootstrap";
import { Link } from "react-router-dom";

function Card({
  title,
  about,
  price,
  img,
  key,
  id,
  user,
  currentUser,
  handelDeleteProduct,
  handelEditProduct,
  handelAddToCart,
  ...res
}) {
  if (user === currentUser) {
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
          src={img}
        />
        <LittelCard.Body>
          <LittelCard.Title className="fw-bold">{title}</LittelCard.Title>
          <LittelCard.Text>{about}</LittelCard.Text>
          <div
            className="d-flex align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <span className="fw-bold text-warning">{price}$</span>
            {user === currentUser ? (
              <span
                id={id}
                className="material-symbols-outlined flex-end p-2 fs-5 btn btn-warning"
                onClick={handelEditProduct}
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
                  to={"/product-details/" + id}
                >
                  details
                </Link>
              </div>
            )}
          </div>
          <CloseButton
            id={id}
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
