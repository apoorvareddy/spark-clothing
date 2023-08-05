import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import KidsCloths from '../../../assets/images/kids-ethnic-dress.jpg';
import MensCloths from '../../../assets/images/men-shirt.jpg';
import WomenCloths from '../../../assets/images/women-dress.jpg';
import './LiveOffersCarousel.css';

const LiveOffersCarousel = () => {
  // data related to carousel
  const data = [
    {
      src: KidsCloths,
      caption: 'Kids Wear',
      url: '/products?category=Kids',
      description: 'Bright, cheerful & fun to wear styles for kids',
      altText: 'Kids Slide'
    },
    {
      src: MensCloths,
      caption: 'Men\'s Wear',
      url: '/products?category=Men',
      description: 'update your on-duty style, add a dose of cool to style',
      altText: 'Mens Slide'
    },
    {
      src: WomenCloths,
      caption: 'Women\'s Wear',
      url: '/products?category=Women',
      description: 'Stay stylish with colourful prints, effortless fits',
      altText: 'Womens Slide'
    }
  ];

  return (
    <Carousel interval={5000} data-bs-theme="dark">
      {data.map((slide, i) => {
        return (
          <Carousel.Item key={i} className="justify-content-center">
            <img src={slide.src} alt={slide.altText} />
            <Carousel.Caption>
              <p>{slide.description}</p>
              <Link to={slide.url}>{slide.caption}</Link>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default LiveOffersCarousel;
