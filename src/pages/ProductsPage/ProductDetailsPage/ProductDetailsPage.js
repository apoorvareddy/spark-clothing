import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Button, ButtonGroup } from 'react-bootstrap';
import Review from './Review/Review';
import Title from '../../../components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faAngleLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [quantityTicker, setQuantityTicker] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [existingEmails, setExistingEmails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch');
        }
        return response.json();
      })
      .then((product) => {
        setProductDetails(product);
        const emails = product.reviews.map((review) => review.email);
        setExistingEmails(emails);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
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
      .catch((err) => console.log('error in patch' + err))
      .finally(() => {
      })
  }

  if (error) {
    return <div>Invalid Product, The entered Product is not listed.</div>
  }

  if (!productDetails) {
    return <div className="spinner-border text-success" role="status" />
  }

  return (
    <Container>
      <Title pageTitle='Product Details' />
      <Row>
        <Col xs={12}>
          <Link to='/products' className='back-to-products'><FontAwesomeIcon icon={faAngleLeft} />Back to Products</Link>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Image src={productDetails.imageUrl} alt={productDetails.imgAltText} rounded />
        </Col>

        <Col xs={12} sm={6} md={8}>
          <h3>{productDetails.name}</h3>
          <p>{productDetails.description}</p>
          <h5>Rs.{productDetails.maxRetailPrice}</h5>
          <p className='review-count'>Number of Reviews : {productDetails.reviews.length}</p>
          <div className='quantity'>
            <ButtonGroup aria-label="Quantity change">
              <Button variant="secondary" data-testid='decrementBtn' onClick={handleDecrement}>-</Button>
              <p className='added-quantity text-center align-items-center'>{quantityTicker}</p>
              <Button variant="secondary" data-testid='incrementBtn' onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </div>
          <div className='button-section'>
            <Button variant="secondary">ADD TO CART</Button>
            <Button className='wishlist-btn'><FontAwesomeIcon icon={faHeart} />WISHLIST</Button>
          </div>
          <Review onFormSubmit={handleFormSubmit} existingEmails={existingEmails} />
          <h6>Customer Reviews:</h6>
          <div className='customer-reviews'>
            {productDetails.reviews?.map((review, index) => {
              return (
                <div key={index}>
                  <p>{review.rating}<FontAwesomeIcon icon={faStar} /></p>
                  <p>{review.name}</p>
                  <p>{review.comment}</p>
                </div>
              )
            })}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailsPage;
