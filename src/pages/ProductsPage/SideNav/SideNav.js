import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const SideNav = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log('API call completed');
      });
  }, []);
  return (
    <div className='col-12 col-sm-2'>
      <Nav className="flex-column">
        {
          categories.map((category) => {
            return (
              <Link key={category.id} to={category.name !== 'All' ? `/products?category=${category.name}` : '/products'}>{category.name}</Link>
            )
          })
        }
      </Nav>
    </div>
  )
}

export default SideNav;
