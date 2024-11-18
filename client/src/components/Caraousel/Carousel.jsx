import { Carousel as LittelCarousel } from 'react-bootstrap';

function Carousel() {
    return (
        <LittelCarousel>
        <LittelCarousel.Item>
          <img className="d-block" src="image.png" />
        </LittelCarousel.Item>
        <LittelCarousel.Item>
          <img className="d-block" src="image.png" />
        </LittelCarousel.Item>
        <LittelCarousel.Item>
          <img className="d-block" src="image.png" />
        </LittelCarousel.Item>
      </LittelCarousel>
    );
}

export default Carousel;