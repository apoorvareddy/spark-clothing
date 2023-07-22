import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Product from '../../../components/Product/Product';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/products')
  }

  useEffect(() => {
    fetch('http://localhost:5000/products?_limit=3')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              tagLine={product.tagLine} />
          );
        })}
        <Button onClick={handleNavigate} className='view-all-button' variant='secondary'>View All</Button>
      </Row>
    </Container>
  );
};

export default LatestProducts;
