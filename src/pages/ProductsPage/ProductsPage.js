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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const order = searchParams.get('order');

  // const dropdownOptions = [
  //   { key: 'asc', value: 'Price: Low to High' },
  //   { key: 'desc', value: 'Price: High to Low' }
  // ];

  const orderLabels = {
    asc: 'Price: Low to High',
    desc: 'Price: High to Low'
  }

  // const [selected, setSelected] = useState({});

  const handleSelect = (selectedOrder) => {
    searchParams.set('sort', 'maxRetailPrice');
    searchParams.set('order', selectedOrder);
    setSearchParams(searchParams);
  };

  let apiUrl = 'http://localhost:5000/products';

  const updateApiUrl = () => {
    apiUrl = 'http://localhost:5000/products'
    if (category && category !== 'All') {
      apiUrl += `?category=${category}`;
      console.log('category' + apiUrl);
    }
    if (order) {
      apiUrl += `${category && category !== 'All' ? '&' : '?'}_sort=maxRetailPrice&_order=${order}`;
      console.log('order' + apiUrl);
    }
  }

  // console.log(apiUrl);

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
        console.log(data)
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        // setSelected(order && dropdownOptions.find(obj => obj.key === order));
      });
  }, [category, order]);

  if (error) {
    return <Alert variant='danger'>Unable to fetch products, try again later.</Alert>
  }

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
            {/* {dropdownOptions.map((item, index) => {
              return (
                <Dropdown.Item key={index} eventKey={item.key}>
                  {item.value}
                </Dropdown.Item>
              );
            })} */}
            <Dropdown.Item eventKey='asc'>Price: Low to High</Dropdown.Item>
            <Dropdown.Item eventKey='desc'>Price: High to Low</Dropdown.Item>
          </DropdownButton>

          <Row>
            {products.map((product, i) => {
              return (
                <Product
                  key={i}
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

        </div>
      </Row>
    </Container>
  );
};

export default ProductsPage;
