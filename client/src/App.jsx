import RegisterPage from "./components/RegisterPage/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import "../public/style.css";
import { useEffect, useState } from "react";
import auth from "../api/auth";
import UserContext from "./context/userContext";
import ThemeContext from "./context/themeContext";
import Navbar from "./components/Navbar";
import PrivetRouter from "./router/PrivetRouter";
import Loading from "./components/Loading";
import SellPage from "./components/SellPage/SellPage";
import SellMyProductPage from "./components/SellMyProductPage/SellMyProductPage";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    setUser(auth.getUser() || null);
    setLoading(false);
  }, []);

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
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<PrivetRouter component={Home} />} />
            <Route path="/register" Component={RegisterPage} />
            <Route
              path="/sell"
              element={<PrivetRouter component={SellPage} />}
            />
            <Route
              path="/my-sellers"
              element={<PrivetRouter component={SellMyProductPage} />}
            />
          </Routes>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
