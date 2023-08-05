import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import Product from '../../../components/Product/Product';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/products')
  }

  useEffect(() => {
    fetch('http://localhost:5000/products?_limit=3')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <Alert variant='danger'>Unable to fetch products, try again later.</Alert>
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => {
          return (
            <Product key={i}
              imageUrl={product.imageUrl}
              id={product.id}
              name={product.name}
              maxRetailPrice={product.maxRetailPrice}
              tagLine={product.tagLine}
              discountApplicable={product.discountApplicable}
              imgAltText={product.imgAltText} />
          );
        })}
        <Button onClick={handleNavigate} className='view-all-button' variant='secondary' data-testid='view-all'>View All</Button>
      </Row>
    </Container>
  );
};

export default LatestProducts;
