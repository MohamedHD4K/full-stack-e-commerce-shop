import { Card as LittelCard } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Card() {
  return (
    <LittelCard style={{ width: "18rem" }}>
      <LittelCard.Img variant="top" src="test.png" />
      <LittelCard.Body>
        <LittelCard.Title>Card Title</LittelCard.Title>
        <LittelCard.Text>
          Some quick example text to build on the card title and make up the
        </LittelCard.Text>
        <Button variant="primary">Go somewhere</Button>
      </LittelCard.Body>
    </LittelCard>
  );
}

export default Card;
