import { Carousel as LittelCarousel } from 'react-bootstrap';

function Carousel() {
    return (
        <LittelCarousel className='mb-3'>
        <LittelCarousel.Item>
          <img className="d-block img" style={{height:"60vh"}} src="1.png" />
        </LittelCarousel.Item>
        <LittelCarousel.Item>
          <img className="d-block img" style={{height:"60vh"}} src="2.png" />
        </LittelCarousel.Item>
        <LittelCarousel.Item>
          <img className="d-block img" style={{height:"60vh"}} src="3.png" />
        </LittelCarousel.Item>
      </LittelCarousel>
    );
}

export default Carousel;