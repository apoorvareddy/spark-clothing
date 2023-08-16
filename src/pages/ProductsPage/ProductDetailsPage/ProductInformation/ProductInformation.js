import { Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useDiscountedPrice from '../../../../hooks/useDiscountedPrice/useDiscountedPrice';

// product information component with props
const ProductInformation = ({ name, description, maxRetailPrice, discountApplicable, quantity }) => {
  const [quantityTicker, setQuantityTicker] = useState(1);
  const { discountedPrice } = useDiscountedPrice(maxRetailPrice, discountApplicable);

  // perform quantity decrement when clicked on decrement button
  const handleDecrement = () => {
    if (quantityTicker > 1) {
      setQuantityTicker(quantityTicker - 1);
    }
  }

  // perform quantity increment till available quantity when clicked on increment button
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

      <div className='quantity'>
        <ButtonGroup aria-label="Quantity change" className='quantity-button'>
          <Button variant="secondary" data-testid='decrementBtn' onClick={handleDecrement}>-</Button>
          <p className='added-quantity text-center align-items-center' data-testid='currentQuantity'>{quantityTicker}</p>
          <Button variant="secondary" data-testid='incrementBtn' onClick={handleIncrement}>+</Button>
        </ButtonGroup>
        <Button variant="secondary">ADD TO CART</Button>
      </div>
    </div>
  )
}

ProductInformation.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  maxRetailPrice: PropTypes.number,
  discountApplicable: PropTypes.number,
  quantity: PropTypes.number
}

export default ProductInformation;
