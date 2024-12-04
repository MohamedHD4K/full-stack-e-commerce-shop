import { Button, Container, Row, Stack } from "react-bootstrap";
import Card from "../Card";
import Carousel from "../Carousel";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import productApi from "../../../api/products";
import Loading from "../Loading";
import SearchModal from "../Modals/SearchModal";
import CollectionOfProducts from "../CollectionOfProducts";

function HomePage({ setCart, cart }) {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreProducts, setMoreProducts] = useState(10);

  let check = true;

  document.title = "Home";

  const handelAddMoreProducts = () => {
    setMoreProducts((c) => c + 10);
  };

  const handleCartUpdate = (productId, quantity) => {
    if (quantity === 0) return setCart([]);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
      return [...prevCart, { productId, quantity }];
    });
  };

  const handelLoad = () => {
    cart.map((item) => {
      handleCartUpdate(item.productId, item.quantity);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <>
      <Carousel />
      <Container>
        <Stack onLoad={handelLoad}>
          <Row>
            {loading ? (
              <Loading />
            ) : products.length > 0 ? (
              products.map((product, index) => (
                <>
                  {index < moreProducts ? (
                    <Card
                      key={product._id}
                      product={product}
                      currentUser={user._id}
                      calledIn="home"
                      className="p-0 m-2"
                      handleCartUpdate={handleCartUpdate}
                      cart={cart}
                    />
                  ) : (
                    check && (
                      <div className="d-flex justify-content-center align-items-center">
                        {(check = false)}
                        <Button onClick={handelAddMoreProducts}>
                          More Products
                        </Button>
                      </div>
                    )
                  )}
                </>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </Row>
          <CollectionOfProducts
            products={products}
            value="Clothes"
            loading={loading}
            user={user}
            cart={cart}
            handleCartUpdate={handleCartUpdate}
          />

          <CollectionOfProducts
            products={products}
            value="Furniture"
            loading={loading}
            user={user}
            cart={cart}
            handleCartUpdate={handleCartUpdate}
          />
          <CollectionOfProducts
            products={products}
            value="Electronics"
            loading={loading}
            user={user}
            cart={cart}
            handleCartUpdate={handleCartUpdate}
          />
          <CollectionOfProducts
            products={products}
            value="Food"
            loading={loading}
            user={user}
            cart={cart}
            handleCartUpdate={handleCartUpdate}
          />
        </Stack>
        <SearchModal />
      </Container>
    </>
  );
}

export default HomePage;
