import { Button, ButtonGroup } from 'react-bootstrap';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useDiscountedPrice from '../../../../hooks/useDiscountedPrice/useDiscountedPrice';

const ProductInformation = ({ name, description, maxRetailPrice, discountApplicable, reviewCount, quantity }) => {
  const [quantityTicker, setQuantityTicker] = useState(1);
  const { discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);

  const handleDecrement = () => {
    if (quantityTicker > 1) {
      setQuantityTicker(quantityTicker - 1);
    }
  }

  const handleIncrement = () => {
    if (quantityTicker < quantity) {
      setQuantityTicker(quantityTicker + 1);
    }
  }
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>
        <span className='discount-price'>Rs.{discountedPrice}</span>
        <s className='max-retail-price'>Rs.{maxRetailPrice}</s>
        <span className='discount-percentage'>({discountApplicable}% OFF) </span>
      </p>
      <p className='review-count'>Number of Reviews : {reviewCount}</p>
      <div className='quantity'>
        <ButtonGroup aria-label="Quantity change">
          <Button variant="secondary" data-testid='decrementBtn' onClick={handleDecrement}>-</Button>
          <p className='added-quantity text-center align-items-center' data-testid='currentQuantity'>{quantityTicker}</p>
          <Button variant="secondary" data-testid='incrementBtn' onClick={handleIncrement}>+</Button>
        </ButtonGroup>
      </div>
      <div className='button-section'>
        <Button variant="secondary">ADD TO CART</Button>
        <Button className='wishlist-btn'><FontAwesomeIcon icon={faHeart} />WISHLIST</Button>
      </div>
    </div>
  )
}

ProductInformation.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  maxRetailPrice: PropTypes.number,
  discountApplicable: PropTypes.number,
  reviewCount: PropTypes.number,
  quantity: PropTypes.number
}

export default ProductInformation;
