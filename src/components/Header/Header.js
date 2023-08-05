// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// // import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/LOGO.jpg';
import Menu from '../Menu/Menu';
import './Header.css';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar
      expand="md"
      className="mb-3 fixed-top"
      bg="light"
      data-bs-theme="light"
      style={{ borderBottom: '2px solid rgb(105 120 120)' }}
      data-testid='header'
    >
      <Container fluid>
        <Link className="navbar-brand" to="/" style={{ padding: '0px' }}>
          <img
            src={Logo}
            alt="Spark Clothing Shop Logo"
            style={{ width: '180px', height: '50px' }}
          />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Form.Group className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form.Group>
            <Menu showIcons={true} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
