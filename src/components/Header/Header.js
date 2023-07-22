import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/LOGO.jpg';
import Menu from '../Menu/Menu';
import './Header.css';

const Header = () => {
  return (
    <Navbar
      expand="md"
      className="mb-3 fixed-top"
      bg="light"
      data-bs-theme="light"
      style={{ borderBottom: '2px solid rgb(105 120 120)' }}
    >
      <Container fluid>
        <Link className="navbar-brand" to="/" style={{ padding: '0px' }}>
          <img
            src={Logo}
            alt="Spark Clothing Shop Logo"
            style={{ width: '180px', height: '50px' }}
          />
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Menu />
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
