import { useContext } from "react";
import { Card as LittelCard } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ThemeContext from "../context/themeContext";

function Card() {
  const { theme , setTheme } = useContext(ThemeContext);

  const handelTheme = () => {
    setTheme(pre => !pre)
  };

  return (
    <LittelCard
      className={theme ? "bg-dark" : "bg-light"}
      style={{ width: "18rem" }}
    >
      <LittelCard.Img variant="top" src="test.png" />
      <LittelCard.Body>
        <LittelCard.Title>Card Title</LittelCard.Title>
        <LittelCard.Text>
          Some quick example text to build on the card title and make up the
        </LittelCard.Text>
        <Button
          variant={theme ? "danger" : "primary"}
          onClick={handelTheme}
        >
          Go somewhere
        </Button>
      </LittelCard.Body>
    </LittelCard>
  );
}

export default Card;
