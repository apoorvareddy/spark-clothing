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
  const [existingEmails, setExistingEmails] = useState([]);

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
        const emails = product.reviews.map((review) => review.email);
        setExistingEmails(emails);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [productId]);

  // handle submit to perform on the child review component form data post to the products detials object
  const handleFormSubmit = async (formState) => {
    productDetails.reviews.push(formState)
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productDetails)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch');
        }
        return response.json();
      })
      .then((res) => {
        setProductDetails(res);
      })
      .catch((err) => setError(err.message))
  }

  // error section to render when some error occured
  if (error) {
    return <Alert variant='danger'>Invalid Product, The entered Product is not listed.</Alert>
  }

  // loader when the productDetails loading
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
          <ProductInformation
            name={productDetails.name}
            description={productDetails.description}
            maxRetailPrice={productDetails.maxRetailPrice}
            discountApplicable={productDetails.discountApplicable}
            reviewCount={productDetails.reviews.length}
            quantity={productDetails.quantity} />

          <Review
            onFormSubmit={handleFormSubmit}
            existingEmails={existingEmails} />

          <h6>Customer Reviews:</h6>
          <div className='customer-reviews'>
            {productDetails.reviews?.map((review, index) => {
              return (
                <div key={index}>
                  <p>{review.rating} <FontAwesomeIcon icon={faStar} /></p>
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
