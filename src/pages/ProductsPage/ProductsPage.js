import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import Product from '../../components/Product/Product';
import SideNav from './SideNav/SideNav';
import Title from '../../components/Title/Title';
import './ProductsPage.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // getting the search params by using useSearchParams hook
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const order = searchParams.get('order');

  // sort order labels
  const orderLabels = {
    asc: 'Price: Low to High',
    desc: 'Price: High to Low'
  }

  // handle select function for selecting sort option and setting search params based on sort
  const handleSelect = (selectedOrder) => {
    searchParams.set('sort', 'maxRetailPrice');
    searchParams.set('order', selectedOrder);
    setSearchParams(searchParams);
  };

  // default apiURl
  let apiUrl = 'http://localhost:5000/products';

  // updateApiUrl based on the side nav link and sort option
  const updateApiUrl = () => {
    apiUrl = 'http://localhost:5000/products'
    if (category && category !== 'All') {
      apiUrl += `?category=${category}`;
    }
    if (order) {
      apiUrl += `${category && category !== 'All' ? '&' : '?'}_sort=maxRetailPrice&_order=${order}`;
    }
  }

  // fetch api call for getting the products
  useEffect(() => {
    updateApiUrl();
    fetch(apiUrl)
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
      })
      .finally(() => {
        // setSelected(order && dropdownOptions.find(obj => obj.key === order));
      });
  }, [category, order]);

  return (
    <Container>
      <Title pageTitle='Products' />

      <Row>
        <h1 className='products-heading'>Products</h1>

        <SideNav />

        <div className="col-12 col-sm-10">
          <div className='product-count'>{products?.length} Products Available</div>

          <DropdownButton
            id="dropdown-menu-align-right"
            data-testid="order-dropdown"
            onSelect={handleSelect}
            title={order ? orderLabels[order] : 'Select Order'}
            variant='secondary'
          >
            <Dropdown.Item eventKey='asc'>Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey='desc'>Price: High to Low</Dropdown.Item>
          </DropdownButton>

          {error
            ? <Alert variant='danger'>Unable to fetch products, try again later.</Alert>
            : <Row>
              {products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    imageUrl={product.imageUrl}
                    id={product.id}
                    name={product.name}
                    maxRetailPrice={product.maxRetailPrice}
                    tagLine={product.tagLine}
                    discountApplicable={product.discountApplicable}
                    imgAltText={product.imgAltText}
                  />
                );
              })}
            </Row>
          }
        </div>
      </Row>
    </Container>
  );
};

export default ProductsPage;
