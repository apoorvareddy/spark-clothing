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
  const { productId } = useParams();
  console.log(productId);
  const [quantityTicker, setQuantityTicker] = useState(1);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setProductDetails(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('API call completed');
      });
  }, [productId]);

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

  const handleFormSubmit = async (formState) => {
    console.log(formState);
    productDetails.reviews.push(formState)
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productDetails)
    })
      .then((res) => res.json())
      .then((res) => {
        setProductDetails(res);
      })
      .catch((err) => console.error(err))
      .finally(() => {
      })
  }
  const isValidProductId = (productId) => {
    if (productDetails.id) {
      return true
    } else return false
  }

  if (!productId || !isValidProductId(productId)) {
    return <div>Invalid Product, The entered Product is not listed.</div>
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

          <Review onSubmit={handleFormSubmit} />
          {/* <h1>{productDetails.reviews.name}</h1> */}
          {productDetails.reviews?.map((review) => {
            return (
              <div key={review.id}>
                <span>{review.rating}</span>
                <span>{review.name}</span>
                <span>{review.comment}</span>
              </div>
            )
          })}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailsPage;
