import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Product.css';
import useDiscountedPrice from '../../hooks/useDiscountedPrice';

const Product = ({ imageUrl, id, name, maxRetailPrice, tagLine, discountApplicable }) => {
  const { discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);
  return (
    <Card className='col-12 col-sm-6 col-md-4'>
      <div className='card-content'>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>
            <Link to={`/products/${id}`}>{name}</Link>
            <p className='tag-line'>{tagLine}</p>
          </Card.Title>
          <Card.Text><span>Rs.{discountedPrice}</span><s>Rs.{maxRetailPrice}</s></Card.Text>
          <Button variant="primary">Add to Cart</Button>
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
  discountApplicable: PropTypes.number
}

export default Product;
