import { Link, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container className='text-center'>
      <h1>About Spart Clothing</h1>
      <h3>“We have the capabilities and experience to deliver the products you need to move forward.”</h3>
      <Link to='history'>Know more About Us</Link>
      <Outlet />
    </Container>
  );
};

export default AboutUsPage;
