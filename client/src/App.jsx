import RegisterPage from "./components/RegisterPage/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import "../public/style.css";
import { useEffect, useState } from "react";
import auth from "../api/auth";
import UserContext from "./context/userContext";
import Navbar from "./components/Navbar";
import PrivetRouter from "./router/PrivetRouter";
import Loading from "./components/Loading";
import SellPage from "./components/SellPage/SellPage";
import SellMyProductPage from "./components/SellMyProductPage/SellMyProductPage";
import CartContext from "./context/cartContext";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { Button } from "react-bootstrap";
import CartPage from "./components/CartPage/CartPage";
import UserPage from "./components/UserPage/UserPage";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [newCart, setNewCart] = useState(true);
  const [cart, setCart] = useState([]);
  const [scrollUp, setScrollUp] = useState();

  useEffect(() => {
    setUser(auth.getUser() || null);
    setLoading(false);
  }, []);

  window.onscroll = () => {
    setScrollUp(window.scrollY);
  };

  const handelGoUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      {scrollUp > 200 && (
        <Button
          onClick={handelGoUp}
          className="go-up rounded-circle material-symbols-outlined fs-5"
        >
          keyboard_arrow_up
        </Button>
      )}

      <CartContext.Provider value={{ newCart, setNewCart }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar cart={cart} />
          <Routes>
            <Route
              path="/"
              element={
                <PrivetRouter component={Home} setCart={setCart} cart={cart} />
              }
            />
            <Route path="/register" Component={RegisterPage} />
            <Route
              path="/sell"
              element={<PrivetRouter component={SellPage} />}
            />
            <Route
              path="/my-sellers"
              element={<PrivetRouter component={SellMyProductPage} />}
            />
            <Route
              path="/product-details/:id"
              element={
                <PrivetRouter component={ProductDetailPage} cart={cart} />
              }
            />
            <Route
              path="/cart"
              element={<PrivetRouter component={CartPage} />}
            />
            <Route
              path="/user/:user"
              element={<PrivetRouter component={UserPage} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
