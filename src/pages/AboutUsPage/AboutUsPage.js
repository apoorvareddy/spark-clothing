import { Link, Outlet } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <>
      <h1>About Spart Clothing</h1>
      <h3>“We have the capabilities and experience to deliver the products you need to move forward.”</h3>
      <Link to='history'>Know more About Us</Link>
      <Outlet />
    </>
  );
};

export default AboutUsPage;
