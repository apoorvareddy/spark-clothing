import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, DropdownButton, Dropdown } from 'react-bootstrap';
import Product from '../../components/Product/Product';
import SideNav from './SideNav/SideNav';
import Title from '../../components/Title/Title';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

  const dropdownOptions = [
    { key: 'asc', value: 'Price: Low to High' },
    { key: 'desc', value: 'Price: High to Low' }
  ];

  const validCategories = ['Men', 'Women', 'Kids'];
  const validSortCategory = ['maxRetailPrice'];
  const validSortOrder = ['asc', 'desc'];
  const supportedParameters = ['category', 'sort', 'order'];

  const [selected, setSelected] = useState({});

  const handleSelect = (key, event) => {
    // setSelected({ key, value: event.target.innerHTML });
    searchParams.set('sort', 'maxRetailPrice');
    searchParams.set('order', key);
    setSearchParams(searchParams);
  };

  let apiUrl;
  switch (true) {
  case category === null && order === null:
    apiUrl = 'http://localhost:5000/products';
    break;
  case category === null && order !== null:
    apiUrl = `http://localhost:5000/products?_sort=maxRetailPrice&_order=${order}`;
    break;
  case category !== null && order === null:
    apiUrl = `http://localhost:5000/products?category=${category}`;
    break;
  case category !== null && order !== null:
    apiUrl = `http://localhost:5000/products?category=${category}&_sort=maxRetailPrice&_order=${order}`;
    break;

  default:
    apiUrl = 'http://localhost:5000/products';
    break;
  }

  // console.log(apiUrl);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // console.log(data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSelected(order && dropdownOptions.find(obj => obj.key === order));
      });
  }, [category, order]);

  if (category && (!category || !validCategories.includes(category))) {
    return <h4>We couldn&apos;t find any matches! Please check the spelling or try searching something else</h4>
  }

  if (sort && (!sort || !validSortCategory.includes(sort))) {
    return <h4>We couldn&apos;t find any matches! Please check the spelling or try searching something else</h4>
  }

  if (order && (!order || !validSortOrder.includes(order))) {
    return <h4>We couldn&apos;t find any matches! Please check the spelling or try searching something else</h4>
  }

  for (const [param] of searchParams.entries()) {
    if (!supportedParameters.includes(param)) {
      return <h4>We couldn&apos;t find any matches! Please check the spelling or try searching something else</h4>
    }
  }

  return (
    <Container>
      <Title pageTitle='Products' />
      <Row>
        <SideNav />
        <div className="col-12 col-sm-10">
          <DropdownButton
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
            title={selected?.value || 'Select Order'}
          >
            {dropdownOptions.map((item, index) => {
              return (
                <Dropdown.Item key={index} eventKey={item.key}>
                  {item.value}
                </Dropdown.Item>
              );
            })}
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
