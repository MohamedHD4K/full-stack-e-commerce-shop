import { Container } from "react-bootstrap";
import Card from "../Card/Card";
import Carousel from "../Caraousel/Carousel";
import { useContext } from "react";
import UserContext from "../../context/userContext";

function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Carousel />
      <Container>
        <Card />
        <Card />
        <Card />
      </Container>
    </>
  );
}
export default Home;
