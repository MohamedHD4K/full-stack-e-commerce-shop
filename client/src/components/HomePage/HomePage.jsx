import { Container } from "react-bootstrap";
import Card from "../Card";
import Carousel from "../Carousel";
import { useContext } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Carousel />
      <h1>Hellow {user.username}</h1>
      <Link className="btn btn-primary" to="/sell">Sell</Link>
      <Container>
        <Card />
      </Container>
    </>
  );
}
export default HomePage;
