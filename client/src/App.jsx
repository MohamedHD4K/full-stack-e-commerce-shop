import RegisterPage from "./components/RegisterPage/RegisterPage";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import "../public/style.css";
import { useEffect, useState } from "react";
import auth from "../api/auth";
import UserContext from "./context/userContext";
import Navbar from "./Navbar/Navbar";
import PrivetRouter from "./components/router/PrivetRouter";
import Loading from "./components/Loading";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(auth.getUser() || null);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivetRouter component={Home} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
