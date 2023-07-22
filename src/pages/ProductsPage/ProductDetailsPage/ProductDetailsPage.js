import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './ProductDetailsPage.css'
import Review from './Review/Review';

const ProductDetailsPage = () => {
  const params = useParams();
  const [quantityTicker, setQuantityTicker] = useState(1);
  console.log(setQuantityTicker);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${params.productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('API call completed');
      });
  }, []);

  const handleDecrement = () => {
    if (quantityTicker > 1) {
      setQuantityTicker(quantityTicker - 1);
    }
  }

  const handleIncrement = () => {
    if (quantityTicker < productDetails.quantity) {
      setQuantityTicker(quantityTicker + 1);
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Link to='/products'>Back to Products</Link>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Image src={productDetails.imageUrl} alt={productDetails.imgAltText} rounded />
        </Col>

        <Col xs={12} sm={6} md={8}>
          <h3>{productDetails.name}</h3>
          <p>{productDetails.description}</p>
          <h5>Rs.{productDetails.maxRetailPrice}</h5>
          <div className='quantity'>
            <ButtonGroup aria-label="Quantity change">
              <Button variant="secondary" data-testid='decrementBtn' onClick={handleDecrement}>-</Button>
              <p className='added-quantity text-center align-items-center'>{quantityTicker}</p>
              <Button variant="secondary" data-testid='incrementBtn' onClick={handleIncrement}>+</Button>
            </ButtonGroup>
            <Button variant="primary">Add to Cart</Button>
          </div>
          <Review id={productDetails.id} />
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailsPage;
