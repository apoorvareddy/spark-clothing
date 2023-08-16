import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Alert } from 'react-bootstrap';
import './SideNav.css'

const SideNav = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // api call for getting the categories
  useEffect(() => {
    fetch('http://localhost:50000/categories')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch');
        }
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => {
        setError(err.message);
      })
  }, []);

  return (
    <div className='col-12 col-sm-2 side-nav' data-testid='nav-section'>
      <Nav className="flex-column">
        <h4 className='sub-heading'>Categories</h4>
        {error
          ? <Alert variant='danger' className=''>Unable to fetch categories, try again later.</Alert>
          : categories.map((category) => {
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
