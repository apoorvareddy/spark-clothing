import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Image, Alert } from 'react-bootstrap';
import Review from './Review/Review';
import Title from '../../../components/Title/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductDetailsPage.css';
import ProductInformation from './ProductInformation/ProductInformation';

const ProductDetailsPage = () => {
  // useParams for getting the param from url
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);

  // fetch api for getting the product details
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
        setReviews(product.reviews);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [productId]);

  // handle submit to perform on the child review component form data post to the products detials object
  const updatedProductReviews = (updatedReviews) => {
    setProductDetails(prevProductDetails => ({
      ...prevProductDetails,
      reviews: [...prevProductDetails.reviews, updatedReviews]
    }))
    setReviews(updatedReviews)
  }

  return (
    <Container>
      <Title pageTitle='Product Details' />

      <Row>
        <Col xs={12}>
          <Link to='/products' className='back-to-products'><FontAwesomeIcon icon={faAngleLeft} />Back to Products</Link>
        </Col>
        {error
          ? <Alert variant='danger'>Unable to fetch product details</Alert>
          : <Row>
            {!productDetails
              ? <div className="spinner-border text-success" role="status" />
              : <>
                <Col xs={12} sm={6} md={4}>
                  <Image src={productDetails.imageUrl} alt={productDetails.imgAltText} rounded />
                </Col>

                <Col xs={12} sm={6} md={8}>
                  <ProductInformation
                    name={productDetails.name}
                    description={productDetails.description}
                    maxRetailPrice={productDetails.maxRetailPrice}
                    discountApplicable={productDetails.discountApplicable}
                    quantity={productDetails.quantity} />

                  <div className='review-section row' data-testid='review-section'>
                    <div className='col-sm-6'>
                      Total Reviews: {reviews?.length}
                    </div>
                    <div className='col-sm-6'>
                      <Review
                        onFormSubmit={updatedProductReviews}
                        reviews={reviews} />
                    </div>
                  </div>

                  <h6>Customer Reviews:</h6>
                  <div className='customer-reviews'>
                    {reviews?.map((review) => {
                      return (
                        <div key={review.id}>
                          <p>{review.rating} <FontAwesomeIcon icon={faStar} /></p>
                          <p>{review.name}</p>
                          <p>{review.comment}</p>
                        </div>
                      )
                    })}
                  </div>

                </Col>
              </>}
          </Row>}
      </Row>

    </Container>
  )
}

export default ProductDetailsPage;
