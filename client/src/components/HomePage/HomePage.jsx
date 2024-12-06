import { Button, Container, Row, Stack } from "react-bootstrap";
import Card from "../Card";
import Carousel from "../Carousel";
import { useContext, useEffect, useMemo, useState, useCallback } from "react";
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

  useEffect(() => {
    document.title = "Home";
  }, []);

  const handelAddMoreProducts = useCallback(() => {
    setMoreProducts((c) => c + 10);
  }, []);

  const handleCartUpdate = useCallback(
    (productId, quantity) => {
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
    },
    [setCart]
  );

  const handelLoad = useCallback(() => {
    cart.forEach((item) => {
      handleCartUpdate(item.productId, item.quantity);
    });
  }, [cart, handleCartUpdate]);

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

  const visibleProducts = useMemo(
    () => products.slice(0, moreProducts),
    [products, moreProducts]
  );

  const renderProducts = useMemo(() => {
    if (loading) return <Loading />;
    if (products.length === 0) return <p>No products available.</p>;
    return (
      <>
        {visibleProducts.map((product) => (
          <Card
            key={product._id}
            product={product}
            currentUser={user._id}
            calledIn="home"
            className="p-0 m-2"
            handleCartUpdate={handleCartUpdate}
            cart={cart}
          />
        ))}
        {moreProducts < products.length && (
          <div className="d-flex justify-content-center align-items-center">
            <Button onClick={handelAddMoreProducts}>More Products</Button>
          </div>
        )}
      </>
    );
  }, [loading, products, visibleProducts, user, cart, handleCartUpdate, moreProducts, handelAddMoreProducts]);

  return (
    <>
      <Carousel />
      <Container>
        <Stack onLoad={handelLoad}>
          <Row>{renderProducts}</Row>
          {["Clothes", "Furniture", "Electronics", "Food"].map((category) => (
            <CollectionOfProducts
              key={category}
              products={products}
              value={category}
              loading={loading}
              user={user}
              cart={cart}
              handleCartUpdate={handleCartUpdate}
            />
          ))}
        </Stack>
        <SearchModal />
      </Container>
    </>
  );
}

export default HomePage;
