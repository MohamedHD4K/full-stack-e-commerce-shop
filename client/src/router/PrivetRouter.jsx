import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/userContext";

function PrivetRouter({ component: Component , ...res }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/register" />;
  }

  return <Component {...res}/>;
}

export default PrivetRouter;
