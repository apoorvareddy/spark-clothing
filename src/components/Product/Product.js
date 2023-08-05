import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Product.css';
import useDiscountedPrice from '../../hooks/useDiscountedPrice/useDiscountedPrice';

const Product = ({ imageUrl, id, name, maxRetailPrice, tagLine, discountApplicable, imgAltText }) => {
  // using useDiscountedPrice hook for discountedPrice
  const { discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);
  return (
    <Card className='col-12 col-sm-6 col-md-4'>
      <div className='card-content'>
        <Card.Img variant="top" data-testid='imageUrl' src={imageUrl} alt={imgAltText} />

        <Card.Body>
          <Card.Title>
            <Link to={`/products/${id}`} data-testid='name'>{name}</Link>
            <p className='tag-line' data-testid='tagLine'>{tagLine}</p>
          </Card.Title>

          <Card.Text>
            <span className='discount-price' data-testid='discountedPrice'>Rs.{discountedPrice}</span>
            <s data-testid='maxRetailPrice'>Rs.{maxRetailPrice}</s>
            <span className='discount-percentage' data-testid='discountApplicable'>({discountApplicable}% OFF)</span>
          </Card.Text>
          <Button variant="secondary">Add to Cart</Button>
        </Card.Body>
      </div>
    </Card>
  )
}

Product.propTypes = {
  imageUrl: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  maxRetailPrice: PropTypes.number,
  tagLine: PropTypes.string,
  discountApplicable: PropTypes.number,
  imgAltText: PropTypes.string
}

export default Product;
