import { Row } from "react-bootstrap";
import Loading from "./Loading";
import Card from "./Card";

const CollectionOfProducts = ({
  products,
  value,
  loading,
  user,
  cart,
  handleCartUpdate,
}) => {
  return (
    <div className="bg-light my-2 p-3 rounded ">
      <h1 className="text-dark ">{value}</h1>
      <Row className="p-2 overflow-auto flex-nowrap">
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          products.map(
            (product) =>
              product.tags.length > 0 &&
              product.tags.map(
                (tag) =>
                  tag === value && (
                    <Card
                      key={product._id}
                      product={product}
                      currentUser={user._id}
                      calledIn="home"
                      className="p-0 m-2 bg-dark text-light"
                      handleCartUpdate={handleCartUpdate}
                      cart={cart}
                    />
                  )
              )
          )
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </div>
  );
};

export default CollectionOfProducts;
